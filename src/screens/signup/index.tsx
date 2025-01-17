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
import {ScreenNames} from '../../navigator/screenNames';
import InputField from '../../components/TextInput';
import styles from './styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigator/types';
import {colors} from '../../theme';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Button from '../../components/Button';

import {showToast} from '../../components/CustomToast';
import CustomModal from '../../components/CustomModal';
import CustomCalendar from '../../components/CustomCalendar';
import { ThemeContext } from '../../utils/theme-context';
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
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setphoneError] = useState<boolean>(false);
  const [nameError, setnameError] = useState<boolean>(false);
  
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [birthError, setbirthError] = useState<boolean>(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [showCalendar, setShowCalendar] = useState(false);
  const [cnfrmPasswordError, setcnfrmPasswordError] = useState<boolean>(false);
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
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 

  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode;  

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setEmailError(true);
      
      showToast('error', 'Invalid Email format');

      return false;
    } else {
      setEmailError(false);
    }

    return true;
  };

  const validateDate = (): boolean => {
    if (!birthday) {
      setbirthError(true);

      showToast('error', 'Please enter your Date of Birth');
      return false;
    } else {
      console.log('birth false', birthday);
      setbirthError(false);
      return true;
    }
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
    Phone&&
    CnfrmPassword
  );

  const validateName = (name: string) => {
   
    if (!name) {
      setnameError(true)
      showToast('error', 'Name is required.');
      return false;
    }
   
    return true;
  };
  
  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{5,13}$/;  
    if (!phone) {
      setphoneError(true)
      showToast('error', 'Phone number is required.');
      return false;
    }
    if (!phoneRegex.test(phone)) {
      setphoneError(true)
      showToast('error', 'Mobile no should be min 5 digit and max digit 13.');
      return false;
    }

    setphoneError(false)
    return true;
  };
  const validatePassword = (password: string): boolean => {
    if (password.length < 6) {
      setPasswordError(true);
      showToast('error', 'Password should have at least 6 characters');
      return false;
    } else {
      setPasswordError(false);
    }
    return true;
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string,
  ): boolean => {
    if (confirmPassword !== password) {
      setcnfrmPasswordError(true);
      
      showToast('error', 'Passwords do not match');
      return false;
    } else {
      setcnfrmPasswordError(false);
    }
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
    <SafeAreaView style={[styles.container,themeStyles]}>
      <ScrollView
        style={styles.signupContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.textContain}>
          <Text style={[styles.signText,{color:isDarkMode?"#ffffff":'#000'}]}>Hello!</Text>

          <Text style={[styles.welText,{color:isDarkMode?"#ffffff":'#000'}]}>Sign up to get Started</Text>
        </View>
        <View style={styles.textInputContain}>
         
            <InputField
              ref={nameInputRef}
              placeholder="Name"
              value={Name}
              onChangeText={text => SetName(text)}
              returnKeyType="next"
              onSubmitEditing={() => {
                phoneInputRef.current?.focus();
              }}
              style={[styles.inputField,nameError ? {borderColor: 'red'} : {}]}
              iconName="person"
            />
         

         
            <InputField
              ref={phoneInputRef}
              placeholder="Phone No."
              value={Phone}
              onChangeText={text => SetPhone(text)}
              returnKeyType="next"
              onSubmitEditing={() => {
                validatePhoneNumber(Phone)
                birthInputRef.current?.focus();
              }}
              style={[styles.inputField,phoneError ? {borderColor: 'red'} : {}]}
              iconName="phone"
            />
         
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            
              <InputField
                ref={birthInputRef}
                placeholder="DOB"
                value={birthday}
                onChangeText={text => setBirthday(text)}
                returnKeyType="next"
                style={[styles.inputField,birthError ? {borderColor: 'red'} : {}]}
                onSubmitEditing={() => {
                  validateDate();
                  emailInputRef.current?.focus();
                }}
                iconName="calendar-month"
              />
           
          </TouchableOpacity>
         
            <InputField
              ref={emailInputRef}
              placeholder="Email Address"
              value={Email}
              onChangeText={text => SetEmail(text.toLowerCase())}
              returnKeyType="next"
             
              onSubmitEditing={() => {
                validateEmail(Email);
                passwordInputRef.current?.focus();
              }}
              style={[styles.inputField,emailError ? {borderColor: 'red'} : {}]}
              iconName={'email'}
            />
          

         
            <InputField
              ref={passwordInputRef}
              placeholder="Password"
              value={Password}
              onChangeText={text => SetPassword(text)}
              returnKeyType="next"
              onSubmitEditing={() => {
                validatePassword(Password);
                confrmpasswordInputRef.current?.focus();
              }}
              style={[styles.inputField,passwordError ? {borderColor: 'red'} : {}]}
              secureTextEntry={!isPasswordVisible}
              togglePasswordVisibility={() =>
                setIsPasswordVisible(prev => !prev)
              }
              isPasswordVisible={isPasswordVisible}
              iconName="password"
            />
          

         
            <InputField
              ref={confrmpasswordInputRef}
              placeholder="Confirm Password"
              value={CnfrmPassword}
              onChangeText={text => SetCnfrmPassword(text)}
              returnKeyType="next"
              onSubmitEditing={() => {
                validateConfirmPassword(Password, CnfrmPassword);
                handleSubmit();
              }}
              style={[styles.inputField,cnfrmPasswordError ? {borderColor: 'red'} : {}]}
              secureTextEntry={!isPasswordVisible1}
              togglePasswordVisibility={() =>
                setIsPasswordVisible1(prev => !prev)
              }
              isPasswordVisible={isPasswordVisible1}
              iconName="password"
            />
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
          <Text style={{color:isDarkMode?"#ffffff":'#000'}}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.Signin)}>
            <Text style={styles.signupColor}> Sign In</Text>
          </TouchableOpacity>
        </View>

       
        <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <CustomCalendar
          visible={modalVisible}
          selectedDate={birthday}
          onDateSelect={(date) => {setBirthday(date)
            setbirthError(false)
          }}
          onClose={() => setModalVisible(false)}
        />
      </CustomModal>
     
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
