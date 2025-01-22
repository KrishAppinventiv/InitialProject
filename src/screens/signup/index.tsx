import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../utils/screenNames';
import InputField from '../../components/TextInput';
import styles from './styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../utils/types';
import {colors} from '../../theme';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Button from '../../components/Button';

import {showToast} from '../../components/CustomToast';
import CustomModal from '../../components/CustomModal';
import CustomCalendar from '../../components/CustomCalendar';
import {ThemeContext} from '../../utils/theme-context';
import DatePicker from 'react-native-date-picker';
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
  type ErrorState = string;
  type FormFieldState = string;
  const {isDarkMode, toggleTheme} = useContext(ThemeContext);

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
      : '#E8E8E8';
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
        navigation.navigate(ScreenNames.Otp);
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        showToast(
          'success',
          'The email address is already in use by another account.',
        );
      } else if (error.code === 'auth/invalid-email') {
        showToast('success', 'The email address is not valid.');
      } else if (error.code === 'auth/weak-password') {
        showToast('success', 'Password should be at least 6 characters.');
      } else {
        showToast('success', 'An error occurred. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, themeStyles]}>
      <ScrollView
        style={styles.signupContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.textContain}>
          <Text
            style={[styles.signText, {color: isDarkMode ? '#ffffff' : '#000'}]}>
            Hello!
          </Text>

          <Text
            style={[styles.welText, {color: isDarkMode ? '#ffffff' : '#000'}]}>
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
            textStyle={isDarkMode ? styles.white : styles.black}
            onChangeText={text => {
              SetPhone(text)
              validatePhoneNumber(Phone);
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              validatePhoneNumber(Phone);
              birthInputRef.current?.focus();
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
          <Text style={{color: isDarkMode ? '#ffffff' : '#000'}}>
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
            }}
            onCancel={() => setModalVisible(false)}
          />
        </CustomModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
