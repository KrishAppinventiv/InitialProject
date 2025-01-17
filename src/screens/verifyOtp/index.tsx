import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useRef, useEffect, useContext} from 'react';
import {colors} from '../../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenNames} from '../../navigator/screenNames';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import styles from './styles';
import {Images} from '../../assets';
import CustomModal from '../../components/CustomModal';
import {vh} from '../../utils/dimension';
import Toast from 'react-native-toast-message';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigator/types';
import { showToast } from '../../components/CustomToast';
import { ThemeContext } from '../../utils/theme-context';

type OtpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenNames.Otp
>;

const VerifyOtp = () => {
  const navigation = useNavigation<OtpScreenNavigationProp>();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isValid, setIsValid] = useState(true);
  const inputRefs = useRef([]);
  const [attempts, setAttempts] = useState(2);
  const [entry, setEntry] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 

  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode; 
  
  const startNewTimer = () => {
    setTimer(30);
    setIsTimerExpired(false);

    const id = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 1) {
          clearInterval(id);
          setIsTimerExpired(true);
          {
            isTimerExpired &&
             
              showToast('error', 'OTP Expired','Please request a new otp.');
          }

          return 0;
        }
        return prevTimer - 1;
      });

      if (intervalId) {
        clearInterval(intervalId);
      }
    }, 1000);

    setIntervalId(id);
  };

  useEffect(() => {
    setTimeout(() => {
      inputRefs.current[0].focus();
    }, 100);

    startNewTimer();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const buttonColor =
    otp[0] && otp[1] && otp[2] && otp[3] && isTimerExpired === false
      ? colors.main
      : '#E8E8E8';
  const buttonDisabled = !(
    otp[0] &&
    otp[1] &&
    otp[2] &&
    otp[3] &&
    isTimerExpired === false
  );

  
  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, '');
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    if (text === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (newOtp.every(digit => digit.length === 1)) {
      setEntry(true);
    } else {
      setEntry(false);
    }
  };

  const handleSubmit = () => {
    const otpString = otp.join('');
    if (otpString === '1234') {
      
      showToast('success','Account Verified!', 'Your account has been verified successfully.');
       
      setTimeout(() => {
       
        setIsTimerExpired(false);

        navigation.reset({
          index: 0,
          routes: [
            {
              name: ScreenNames.Signin,
            },
          ],
        });
      }, 1000);
    } else {
      setAttempts(prev => prev - 1);
      if (attempts > 0) {
      
        showToast('error', 'Incorrect OTP', `You have ${attempts} attempts remaining.`);
      } else {
      
        showToast('error', 'No attempts remaining. Please request a new code.');
      }

      setIsValid(false);
    }
  };

  return (
    <KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={styles.keyboard}>
  <SafeAreaView style={[styles.container,themeStyles]}>

    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={Images.backarrow} style={styles.arrowImg} />
    </TouchableOpacity>

    <View style={styles.textContainer}>
      <Text style={[styles.headText,isDarkMode && {color:'#ffffff'}]}>OTP Verification</Text>

      <Text style={[styles.greyText,isDarkMode && {color:colors.main}]}>
        Enter the code that we just sent to you on
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <Text style={isDarkMode && {color:'#ffffff'}}>+1*****5435</Text>
      </View>
    </View>

    <View style={styles.textInput}>
      {otp.map((digit, index) => (
        <View key={index} style={styles.ccpContain}>
          <TextInput
            ref={ref => (inputRefs.current[index] = ref)}
            value={digit}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => handleChange(text, index)}
            style={[
              styles.input,
              {
                color: !isValid ? 'red' : 'black',
              },
            ]}
          />
        </View>
      ))}
    </View> 
      <Button
        text="Verify OTP"
        onPress={handleSubmit}
        style={[styles.touch, { backgroundColor: buttonColor }]}
        disabled={buttonDisabled}
      />
    <View style={styles.dontView}>
      <Text style={{ color:isDarkMode?"#ffffff": '#888888' }}>Didn't receive the code?</Text>
      <TouchableOpacity onPress={() => startNewTimer()}>
        <Text style={styles.signupColor}> Resend</Text>
      </TouchableOpacity>
    </View>

    <View style={{ alignItems: 'center', marginTop: vh(30) }}>
      <Text style={{color:isDarkMode?"#ffffff": '#888888' }}>{`00:${timer < 10 ? '0' : ''}${timer}`}</Text>
    </View>

    
  </SafeAreaView>
</KeyboardAvoidingView>

  );
};

export default VerifyOtp;
