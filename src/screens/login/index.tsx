import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  useColorScheme,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {Images} from '../../assets';
import {vh, vw} from '../../theme/dimensions';
import {CountryPicker} from 'react-native-country-codes-picker';
import Button from '../../components/Button';
import {ScreenNames} from '../../navigator/screenNames';
import styles from './styles';
import {colors} from '../../theme';
import {showToast} from '../../components/CustomToast';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../utils/theme-context';

const Login = () => {
  const [countryCode, setCountryCode] = useState('+1');
  const [Phone, SetPhone] = useState('');
  const [show, setShow] = useState(false);
  const [flag, setflag] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [errorVisible, setErrorVisible] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 
  const numberRef = useRef<TextInput | null>(null);
 
  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode;    

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{5,13}$/;
    if (!phone) {
      showToast('error', 'Please enter your phone number');
      setErrorVisible(true);
      return false;
    }
    if (!phoneRegex.test(phone)) {
      showToast('error', 'Mobile no should be min 5 digit and max digit 13');
      setErrorVisible(false);
      return false;
    }
    return true;
  };

  useEffect(() => {
    setTimeout(() => {
      numberRef.current?.focus();
    }, 100);
  }, []);
  const handleSubmit = () => {
    const isValid = validatePhoneNumber(Phone);
    if (isValid) {
      showToast('success', 'Login Successfull!');
      setTimeout(() => {
        navigation.navigate(ScreenNames.BottomTab);
      }, 1000);
    } else {
      setErrorVisible(true);
    }
  };

  const inputBorderColor = errorVisible
    ? 'red'
    : Phone
    ? colors.main
    : '#E8E8E8';
  const buttonColor = Phone ? colors.main : '#E8E8E8';
  const buttonDisabled = !Phone;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={[styles.container]}>
        <ImageBackground source={Images.tutorial} style={styles.ImgBg}>
          <View style={[styles.modalView,themeStyles]}>
            <View style={styles.headView}>
              <Text style={[styles.wlcmText,{color:isDarkMode?'#ffffff':'#000'}]}>{t('screens.login.text.welcomeMessage')}</Text>
              <Text style={[styles.grey,isDarkMode && {color:'#ccc'}]}>
              {t('screens.login.text.instruction')}
              </Text>
              <View
                style={[styles.numberView, {borderColor: inputBorderColor}]}>
                <Icon name="phone" size={20} color={'#ccc'} />
                <Text
                  style={{
                    marginStart: vw(4),
                    color: '#F0F0F0',
                    fontSize: vh(17),
                  }}>
                  |
                </Text>
                <View style={styles.textInput}>
                  {Phone ? (
                    <Text style={styles.floatingLabel}>{t('screens.login.text.mobileNumber')}  </Text>
                  ) : null}

                  <View style={styles.ccpContain}>
                    <CountryPicker
                      show={show}
                      pickerButtonOnPress={item => {
                        setCountryCode(item.dial_code);
                        setflag(item.flag);
                        setShow(false);
                      }}
                      lang={''}
                    />

                    <TouchableOpacity onPress={() => setShow(true)}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.flagText}>{flag}</Text>
                        <Text style={styles.countryCodeText}>
                          {countryCode}
                        </Text>
                        <Icon
                          name="chevron-down"
                          size={15}
                          color={colors.black}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.numberContain}>
                    <TextInput
                      placeholder="Mobile Number"
                      placeholderTextColor={'#ccc'}
                      style={styles.input}
                      value={Phone}
                      onChangeText={text => SetPhone(text)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      keyboardType="numeric"
                      ref={numberRef}
                    />
                  </View>
                </View>
              </View>
            </View>
            <Button
              onPress={handleSubmit}
              style={[styles.touch, {backgroundColor: buttonColor}]}
              disabled={buttonDisabled}
              text={t('screens.login.text.next')}
            />

            <View style={styles.dontView}>
              <Text style={{color:isDarkMode?'#ffffff':'#000'}}>{t('screens.login.text.dontHaveAccount')}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(ScreenNames.Signup);
                }}>
                <Text style={styles.signupColor}> {t('screens.login.text.signUp')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
