import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets';
import {MEAL_FILTERS, NEW_RECIPE} from '../../components/data';
import {vh, vw} from '../../theme/dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import styles from './styles';

import {colors} from '../../theme';
import { ThemeContext } from '../../utils/theme-context';
import { t } from 'i18next';
import { FontSizeContext } from '../../utils/Font/FontSizeContext';
import { ScreenNames } from '../../utils/screenNames';



const Home = () => {
  
  const { fontSizes } = useContext(FontSizeContext);
  const [name, setName] = useState('Krishna Gupta');
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <StatusBar barStyle={'light-content'} />

      <View style={styles.topView}>
        <Image source={Images.top} style={styles.banner} resizeMode='cover' />

        <View style={styles.transparentView}>
          <View style={styles.margin}>
            <Text style={[styles.logo, { fontSize: fontSizes.title }]}>{t('screens.home.greeting')} {name.split(' ').shift()}</Text>
            <Text style={[styles.cookText, { fontSize: fontSizes.subtitle }]}>{t('screens.home.shipmentQuestion')}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.searchBox}
              >
              <Ionicons name={'search'} size={28} color={'#ccc'} />
              <Text style={[styles.placeholder, { fontSize: fontSizes.body }]}>
                {t("screens.home.searchPlaceholder")}
              </Text>
            </TouchableOpacity>
          </View>
         
        </View>
      </View>
    </View>
  );
};

export default Home;
