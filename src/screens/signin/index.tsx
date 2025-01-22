import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  SafeAreaView,
  Modal,
  ScrollView,
  Platform
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ScreenNames} from '../../utils/screenNames';
import styles from './styles';
import {vh, vw} from '../../theme/dimensions';
import Button from '../../components/Button';
import InputField from '../../components/TextInput';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../utils/types';
import Toast from 'react-native-toast-message';
import {colors} from '../../theme';
import {showToast} from '../../components/CustomToast';
import CustomModal from '../../components/CustomModal';
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';
import { Images } from '../../assets';
import { ThemeContext } from '../../utils/theme-context';
import {
  auth,
}from '../../firebase/firebaseConfig';
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
  Profile
} from 'react-native-fbsdk-next';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

  const [emailresetError, setEmailresetError] = useState('');
  
  const [accountError, setAccountError] = useState(false);
  const navigation = useNavigation<SigninScreenNavigationProp>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [resetPasswordEmailSent, setResetPasswordEmailSent] = useState(false);
  const emailInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 

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
  

  const onGoogleButtonPress = async () => {
    console.log('ready');
    try {
      console.log('go');
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const response = await GoogleSignin.signIn();
      console.log('12345678-->', response);
      const idToken = response?.data?.idToken;
     
      if (!idToken) {
        throw new Error('No idToken received from Google');
      }

      const googleCredentials = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredentials);
      await AsyncStorage.setItem('isLoggedIn', 'true');
  
      setTimeout(() => {
        navigation.replace(ScreenNames.BottomTab);
      }, 2000);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in operation is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services not available');
      } else {
        console.error('Error during Google Sign-In:', error);
      }
    }
  };

  useEffect(() => {
    console.log('Configuring Google SignIn...');
    try {
      console.log(GoogleSignin);
      GoogleSignin.configure({
        webClientId: '619186265584-s3un8qc1pk4o5i35dfasurpopjbed12i.apps.googleusercontent.com', 
        iosClientId: '619186265584-p8lqpofknpne2ua2568d0p9fooeaiick.apps.googleusercontent.com', 
        offlineAccess: true
      });
      console.log('Google SignIn configured');
    } catch (error) {
      console.error('Error configuring Google SignIn:', error);
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
  

  const handleEmailSubmit = () => {
    setTimeout(() => {
      if (validateEmail(Email)) {
        passwordInputRef.current?.focus();
      }
    }, 100);
  };

  const buttonColor = Password && Email ? colors.main : '#E8E8E8';
  const buttonDisabled = !(Password && Email);

  const handleForgotPassword = async () => {
    if (!Emailreset) {
      showToast('error', 'Please enter your email address');
      return;
    }
    try {
      setResetPasswordEmailSent(true);
      setModalVisible(false);
      SetEmailReset('');
      showToast('success', 'Reset email sent successfully!');
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setModalVisible(false);
        SetEmailReset('');
      }, 2000);
      showToast('error', 'Error sending reset password email');
    }
  };

  const onFacebookButtonPress = async () => {
    console.log(LoginManager)
    try {
      const result = await LoginManager.logInWithPermissions(
        ['public_profile', 'email'],
      );
      console.log('res', result);
      if (Platform.OS === 'ios') {
        const result = await AuthenticationToken.getAuthenticationTokenIOS();
        console.log(result?.authenticationToken);
      } else {
        const result = await AccessToken.getCurrentAccessToken();
        console.log(result?.accessToken);
      }
      const currentProfile = await Profile.getCurrentProfile();
      if (currentProfile) {
        console.log('current profile', currentProfile);
        await AsyncStorage.setItem('isLoggedIn', 'true');
  
        setTimeout(() => {
          navigation.replace(ScreenNames.BottomTab);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
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
    <SafeAreaView style={[styles.container,themeStyles]}>
      <ScrollView
        style={styles.signupContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.textContain}>
          <Text style={[styles.signText,{color:isDarkMode?"#ffffff":'#000'}]}>Hello Again!</Text>

          <Text style={[styles.welText,{color:isDarkMode?"#ffffff":'#000'}]}>Welcome Back</Text>
        </View>

        <View style={styles.textInputContain}>
         
            <InputField
              ref={emailInputRef}
              placeholder="Email Address"
              value={Email}
              textStyle={isDarkMode?styles.white:styles.black}
              onChangeText={text => {
                SetEmail(text.toLowerCase())
                validateEmail(text)
              }}
              onSubmitEditing={handleEmailSubmit}
              style={[styles.inputField,emailError ? {borderColor: 'red'} : {}]}
              iconName={'email'}
            />

{emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          
            <InputField
              ref={passwordInputRef}
              placeholder="Password"
              textStyle={isDarkMode?styles.white:styles.black}
              value={Password}
              onChangeText={text => {
                SetPassword(text)
                validatePassword(text)
              }}
              secureTextEntry={!isPasswordVisible}
              style={[styles.inputField,passwordError ? {borderColor: 'red'} : {}]}
              togglePasswordVisibility={() =>
                setIsPasswordVisible(prev => !prev)
              }
              isPasswordVisible={isPasswordVisible}
              iconName="password"
            />

{passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        
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
          <TouchableOpacity activeOpacity={0.6} onPress={()=> onGoogleButtonPress()}>
            <View style={styles.googleView}>
              <Image source={Images.google} style={styles.google} />
              <Text style={{fontSize: vh(15), fontWeight: '600'}}>
                Sign in with Google
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={()=> onFacebookButtonPress()}>
            <View style={styles.facebookView}>
              <AntDesign name={'facebook-square'} size={28} color={'white'} />
              <Text
                style={{
                  fontSize: vh(15),
                  marginLeft: vw(6),
                  color: 'white',
                  fontWeight: '600'
                }}>
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
                style={{
                  fontSize: vh(15),
                  marginLeft: vw(6),
                  fontWeight: '600',
                }}>
                Sign in with Phone
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.dontView}>
          <Text style={{color:isDarkMode?"#ffffff":'#000'}}>Don't have an account?</Text>
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
                style={[styles.resetField,emailresetError ? {borderColor: 'red'} : {}]}
                iconName="email"
              />
            </View>
            {emailresetError && (
              <Text style={styles.errorText}>{emailresetError}</Text>
            )}
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
