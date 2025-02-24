// Library Imports
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {KeyboardAvoidingView,Platform, SafeAreaView,ScrollView,Text,TextInput,TouchableOpacity,View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; 
// Custom Imports
import Button from '../../components/Button';
import InputField from '../../components/TextInput';
import CustomModal from '../../components/CustomModal';
import { showToast } from '../../components/CustomToast';

// Utility Imports
import { colors } from '../../theme';
import { ScreenNames } from '../../utils/screenNames';
import { RootStackParamList } from '../../utils/types';
import { ThemeContext } from '../../utils/theme-context';

// Style Imports
import styles from './styles';
type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenNames.Signup
>;

const Signup = () => {
  const [Email, SetEmail] = useState<FormFieldState>('');
  const [Name, SetName] = useState<FormFieldState>('');
  const [Password, SetPassword] = useState<FormFieldState>('');
  const [Phone, SetPhone] = useState<FormFieldState>('');
  const [CnfrmPassword, SetCnfrmPassword] = useState<FormFieldState>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [birthError, setBirthError] = useState<string | null>(null);
  const [cnfrmPasswordError, setCnfrmPasswordError] = useState<string | null>(
    null
  );
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordVisible1, setIsPasswordVisible1] = useState<boolean>(false);
  const [birthday, setBirthday] = useState('');
  const nameInputRef = useRef<TextInput | null>(null);
  const phoneInputRef = useRef<TextInput | null>(null);
  const emailInputRef = useRef<TextInput | null>(null);
  const birthInputRef = useRef<TextInput | null>(null);
  const confrmpasswordInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);
  type FormFieldState = string;
  const {isDarkMode} = useContext(ThemeContext);
  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError('Email is required.');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Invalid Email format.');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validateDate = (): boolean => {
    if (!birthday) {
      setBirthError('Please enter your Date of Birth.');
      return false;
    }
    setBirthError(null);
    return true;
  };
   
  useEffect(() => {
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100);
  }, []);

  const buttonColor =
    Name && Email && Password && birthday && CnfrmPassword && Phone
      ? colors.main
      : colors.thinerGrey;
  const buttonDisabled = !(
    Name &&
    Email &&
    Password &&
    birthday &&
    Phone &&
    CnfrmPassword
  );

  const validateName = (name: string): boolean => {
    if (!name.trim()) {
      setNameError('Name is required.');
      return false;
    }
    setNameError(null);
    return true;
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{5,13}$/;
    if (!phone.trim()) {
      setPhoneError('Phone number is required.');
      return false;
    }
    if (!phoneRegex.test(phone)) {
      setPhoneError('Phone number must be between 5 and 13 digits.');
      return false;
    }
    setPhoneError(null);
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (password.length < 6) {
      setPasswordError('Password should have at least 6 characters.');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
    if (!confirmPassword) {
      setCnfrmPasswordError('Confirm Password is required.');
      return false;
    }
    if (confirmPassword !== password) {
      setCnfrmPasswordError('Passwords do not match.');
      return false;
    }
    setCnfrmPasswordError(null);
    return true;
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      if (
        validatePhoneNumber(Phone) &&
        validateName(Name) &&
        validateDate() &&
        validateEmail(Email) &&
        validatePassword(Password) &&
        validateConfirmPassword(Password, CnfrmPassword)
      ) {
        

        const nameParts = Name.trim().split(' '); 
            const firstInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : ''; 
            const lastInitial = nameParts[1] ? nameParts[1][0].toUpperCase() : ''; 
            const initials = firstInitial + lastInitial; // Combine initials
        const userCredential = await auth().createUserWithEmailAndPassword(
          Email,
          Password
        );
  
        const user = userCredential.user;
  
        
        const newUser = {
          uid: user.uid, 
          name: Name,
          email: Email,
          phoneNumber: Phone,
          profileImg: initials,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };
  
        await firestore().collection('users').doc(user.uid).set(newUser);
  
        console.log('User registered:', user.uid);
  
        // showToast('success', 'Account created successfully!');
        navigation.navigate(ScreenNames.Otp);
      }
    } catch (error: any) {
      console.error('Signup Error:', error);
      if (error.code === 'auth/email-already-in-use') {
        showToast('error', 'The email address is already in use.');
      } else if (error.code === 'auth/invalid-email') {
        showToast('error', 'The email address is not valid.');
      } else if (error.code === 'auth/weak-password') {
        showToast('error', 'Password should be at least 6 characters.');
      } else {
        showToast('error', 'An error occurred. Please try again.');
      }
    }
  };

  return (
   
    <SafeAreaView style={[styles.container, themeStyles]}>
       <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex: 1}}>
      <ScrollView
        style={styles.signupContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.textContain}>
          <Text
            style={[styles.signText, {color: isDarkMode ? colors.white : colors.black}]}>
            Hello!
          </Text>

          <Text
            style={[styles.welText, {color: isDarkMode ? colors.white : colors.black}]}>
            Sign up to get Started
          </Text>
        </View>
        <View style={styles.textInputContain}>
          <InputField
            ref={nameInputRef}
            placeholder="Name"
            textStyle={isDarkMode ? styles.white : styles.black}
            value={Name}
            onChangeText={text => {
              validateName(text)
              SetName(text)
             
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              phoneInputRef.current?.focus();
              validateName(Name)
            }}
            style={[styles.inputField, nameError ? {borderColor: 'red'} : {}]}
            iconName="person"
          />
          {nameError && <Text style={styles.errorText}>{nameError}</Text>}
          <InputField
            ref={phoneInputRef}
            placeholder="Phone No."
            value={Phone}
            keyboardType={'numeric'}
            textStyle={isDarkMode ? styles.white : styles.black}
            onChangeText={text => {
              SetPhone(text)
              validatePhoneNumber(Phone);
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              validatePhoneNumber(Phone);
              setModalVisible(true)
            }}
            style={[styles.inputField, phoneError ? {borderColor: 'red'} : {}]}
            iconName="phone"
          />
        {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <InputField
              ref={birthInputRef}
              placeholder="DOB"
              value={birthday}
              textStyle={isDarkMode ? styles.white : styles.black}
              returnKeyType="next"
              style={[
                styles.inputField,
                birthError ? {borderColor: 'red'} : {},
              ]}
              onSubmitEditing={() => {
                validateDate();
                emailInputRef.current?.focus();
              }}
              iconName="calendar-month"
            />
          </TouchableOpacity>

          {birthError && <Text style={styles.errorText}>{birthError}</Text>}

          <InputField
            ref={emailInputRef}
            placeholder="Email Address"
            value={Email}
            textStyle={isDarkMode ? styles.white : styles.black}
            onChangeText={text => {
              SetEmail(text.toLowerCase())
              validateEmail(text)
            }}
            returnKeyType="next"
            
            onSubmitEditing={() => {
              validateEmail(Email);
              passwordInputRef.current?.focus();
            }}
            style={[styles.inputField, emailError ? {borderColor: 'red'} : {}]}
            iconName={'email'}
          />
         {emailError && <Text style={styles.errorText}>{emailError}</Text>}
          <InputField
            ref={passwordInputRef}
            placeholder="Password"
            value={Password}
            textStyle={isDarkMode ? styles.white : styles.black}
            onChangeText={text => {
              SetPassword(text)
              validatePassword(text)
            }}
            rightIconName='yes'
            returnKeyType="next"
            onSubmitEditing={() => {
              validatePassword(Password);
              confrmpasswordInputRef.current?.focus();
            }}
            style={[
              styles.inputField,
              passwordError ? {borderColor: 'red'} : {},
            ]}
            secureTextEntry={!isPasswordVisible}
            togglePasswordVisibility={() => setIsPasswordVisible(prev => !prev)}
            isPasswordVisible={isPasswordVisible}
            iconName="password"
          />

{passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

          <InputField
            ref={confrmpasswordInputRef}
            placeholder="Confirm Password"
            value={CnfrmPassword}
            textStyle={isDarkMode ? styles.white : styles.black}
            onChangeText={text => {
              SetCnfrmPassword(text)
              validateConfirmPassword(Password,text)
            }}
            rightIconName='yes'
            returnKeyType="next"
            onSubmitEditing={() => {
              validateConfirmPassword(Password, CnfrmPassword);
              handleSubmit();
            }}
            style={[
              styles.inputField,
              cnfrmPasswordError ? {borderColor: 'red'} : {},
            ]}
            secureTextEntry={!isPasswordVisible1}
            togglePasswordVisibility={() =>
              setIsPasswordVisible1(prev => !prev)
            }
            isPasswordVisible={isPasswordVisible1}
            iconName="password"
          />
          {cnfrmPasswordError && <Text style={styles.errorText}>{cnfrmPasswordError}</Text>}
        </View>

        <Button
          onPress={() => handleSubmit()}
          style={[styles.touch, {backgroundColor: buttonColor}]}
          text="Sign Up"
          disabled={buttonDisabled}
        />

        <View style={styles.footerContain}>
          <View style={styles.footerView}></View>
          <Text style={styles.option}>Or</Text>
          <View style={styles.footerView}></View>
        </View>

        <View style={styles.already}>
          <Text style={{color: isDarkMode ? colors.white : colors.black}}>
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.Signin)}>
            <Text style={styles.signupColor}> Sign In</Text>
          </TouchableOpacity>
        </View>

        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}>
         
          <DatePicker
            modal
            open={modalVisible}
            date={birthday ? new Date(birthday) : new Date()}
            mode="date"
            maximumDate={new Date()} // Prevents future dates
            onConfirm={date => {
              setBirthday(date.toISOString().split('T')[0]); // Format YYYY-MM-DD
              setBirthError('')
              setModalVisible(false);
              emailInputRef.current?.focus();
            }}
            onCancel={() => setModalVisible(false)}
          />
        </CustomModal>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
   
  );
};

export default Signup;
