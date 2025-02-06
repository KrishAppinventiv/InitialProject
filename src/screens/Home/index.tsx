// Library Imports
import React, { useContext, useState } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { t } from 'i18next';

// Asset Imports
import { Images } from '../../assets';

// Utility Imports
import { FontSizeContext } from '../../utils/FontSizeContext';
import { ThemeContext } from '../../utils/theme-context';
import PostFeed from '../../components/Post';
// Style Imports
import styles from './styles';
import { colors } from '../../theme';
import { ScreenNames } from '../../utils/screenNames';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenNames.Home
>;

const Home = () => {
  const {fontSizes} = useContext(FontSizeContext);
  const name = 'Krishna Gupta';
  const {isDarkMode} = useContext(ThemeContext);
  const navigation = useNavigation<SignupScreenNavigationProp>();
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.topView}>
        <Image source={Images.top} style={styles.banner} resizeMode="cover" />
        <View style={styles.transparentView}>
          <View style={styles.margin}>
            <Text style={[styles.logo, {fontSize: fontSizes.title}]}>
              {t('screens.home.greeting')} {name.split(' ').shift()}
            </Text>
            <Text style={[styles.cookText, {fontSize: fontSizes.subtitle}]}>
              {t('screens.home.shipmentQuestion')}
            </Text>
            <TouchableOpacity activeOpacity={0.8} style={styles.searchBox}>
              <Ionicons name={'search'} size={28} color={colors.lightGrey} />
              <Text style={[styles.placeholder, {fontSize: fontSizes.body}]}>
                {t('screens.home.searchPlaceholder')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <PostFeed/>
    </View>
  );
};

export default Home;
