// Library Imports
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {Image,SafeAreaView,ScrollView,Text,TextInput,TouchableOpacity,View,
} from 'react-native';
import { GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Asset Imports
import { Images } from '../../assets';

// Custom Imports
import Button from '../../components/Button';
import CustomModal from '../../components/CustomModal';
import { showToast } from '../../components/CustomToast';
import InputField from '../../components/TextInput';

// Service Imports
import { onFacebookButtonPress } from '../../services/facebookSign';
import { onGoogleButtonPress } from '../../services/googleSign';

// Utility Imports
import { colors } from '../../theme';
import { ScreenNames } from '../../utils/screenNames';
import { ThemeContext } from '../../utils/theme-context';
import { RootStackParamList } from '../../utils/types';

// Style Imports
import styles from './styles';

type SigninScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenNames.Signin
>;

const Signin = () => {
 
  const [Email, SetEmail] = useState('');
  const [Emailreset, SetEmailReset] = useState('');
  const [Password, SetPassword] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const navigation = useNavigation<SigninScreenNavigationProp>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const emailInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);
  const {isDarkMode} = useContext(ThemeContext);

  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode;
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  useEffect(() => {

    try {
     
      GoogleSignin.configure({
        webClientId:
          GOOGLE_WEB_CLIENT_ID,
        iosClientId:
         GOOGLE_IOS_CLIENT_ID,
        offlineAccess: true,
      });
     
    } catch (error) {
     
    }

    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 100);
  }, []);

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password should have at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };
  const buttonColor = Password && Email ? colors.main : colors.thinerGrey;
  const buttonDisabled = !(Password && Email);

  const handleForgotPassword = async () => {
    if (!Emailreset) {
      showToast('error', 'Please enter your email address');
      return;
    }
    try {
      setModalVisible(false);
      SetEmailReset('');
      showToast('success', 'Reset email sent successfully!');
    } catch (error) {
      
      setTimeout(() => {
        setModalVisible(false);
        SetEmailReset('');
      }, 2000);
      showToast('error', 'Error sending reset password email');
    }
  };

 

  const handleSubmit = async () => {
    const isEmailValid = validateEmail(Email);
    const isPasswordValid = validatePassword(Password);

    if (!isEmailValid || !isPasswordValid) return;

    try {
      setTimeout(() => {
        showToast('success', 'User logged in successfully!');
      }, 500);

      await AsyncStorage.setItem('isLoggedIn', 'true');

      setTimeout(() => {
        navigation.replace(ScreenNames.BottomTab);
      }, 2000);
    } catch (error) {
      showToast('error', 'User not found. Attempting to sign up...');
    }
  };

  return (
    <SafeAreaView style={[styles.container, themeStyles]}>
      <ScrollView
        style={styles.signupContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.textContain}>
          <Text
            style={[styles.signText, {color: isDarkMode ? colors.white : colors.black}]}>
            Hello Again!
          </Text>

          <Text
            style={[styles.welText, {color: isDarkMode ? colors.white : colors.black}]}>
            Welcome Back
          </Text>
        </View>

        <View style={styles.textInputContain}>
          <InputField
            ref={emailInputRef}
            placeholder="Email Address"
            value={Email}
            textStyle={isDarkMode ? styles.white : styles.black}
            onChangeText={text => {
              SetEmail(text.toLowerCase());
              validateEmail(text);
            }}
            onSubmitEditing={() => {
              setTimeout(() => {
                if (validateEmail(Email)) {
                  passwordInputRef.current?.focus();
                }
              }, 100);
            }}
            style={[styles.inputField, emailError ? {borderColor: 'red'} : {}]}
            iconName={'email'}
          />

          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <InputField
            ref={passwordInputRef}
            placeholder="Password"
            textStyle={isDarkMode ? styles.white : styles.black}
            value={Password}
            rightIconName='yes'
            onChangeText={text => {
              SetPassword(text);
              validatePassword(text);
            }}
            secureTextEntry={!isPasswordVisible}
            style={[
              styles.inputField,
              passwordError ? {borderColor: 'red'} : {},
            ]}
            togglePasswordVisibility={() => setIsPasswordVisible(prev => !prev)}
            isPasswordVisible={isPasswordVisible}
            iconName="password"
          />

          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <View style={styles.forget}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.forgetText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <Button
          onPress={handleSubmit}
          style={[styles.touch, {backgroundColor: buttonColor}]}
          disabled={buttonDisabled}
          text="Sign In"
        />
        <View style={styles.footerContain}>
          <View style={styles.footerView}></View>
          <Text style={styles.option}>Or</Text>
          <View style={styles.footerView}></View>
        </View>

        <View style={styles.otherOption}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => 
              onGoogleButtonPress()}>
            <View style={styles.googleView}>
              <Image source={Images.google} style={styles.google} />
              <Text style={styles.googleText}>
                Sign in with Google
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onFacebookButtonPress()}>
            <View style={styles.facebookView}>
              <AntDesign name={'facebook-square'} size={28} color={'white'} />
              <Text
                style={styles.facebookText}>
                Sign in with Facebook
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate(ScreenNames.Login)}>
            <View style={styles.phoneView}>
              <MaterialIcons
                name={'phone-android'}
                size={28}
                color={colors.black}
              />
              <Text
                style={styles.phoneText}>
                Sign in with Phone
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.dontView}>
          <Text style={{color: isDarkMode ? colors.white : colors.black}}>
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.Signup)}>
            <Text style={styles.signupColor}> Sign Up</Text>
          </TouchableOpacity>
        </View>

        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Your Password</Text>
            <Text style={styles.modalText}>
              Enter your email address, and we will send you a link to reset
              your password.
            </Text>
            <View>
              <InputField
                placeholder="Email Address"
                value={Emailreset}
                onChangeText={text => SetEmailReset(text.toLowerCase())}
                style={[styles.resetField]}
                iconName="email"
              />
            </View>

            <Button
              text="Send Reset Link"
              onPress={handleForgotPassword}
              disabled={false}
              style={styles.resetButton}
            />
          </View>
        </CustomModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;

