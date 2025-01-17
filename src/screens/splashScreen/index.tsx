import {View, Text, Animated, Image, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Images} from '../../assets';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../navigator/screenNames';
// import Splash from 'react-native-splash-screen';

const SplashScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const navigation: any = useNavigation();

  const viewAnimate = () =>
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();

  useEffect(() => {
    
    viewAnimate();
    setTimeout(() => {
      navigation.replace(ScreenNames.Signin);
    }, 2000);
  }, []);

  return (
    <Animated.View
      style={[styles.containers, {opacity: fadeAnim}]}
      testID="splash">
      <ImageBackground
        source={Images.cooking}
        style={styles.container}></ImageBackground>
    </Animated.View>
  );
};

export default SplashScreen;
