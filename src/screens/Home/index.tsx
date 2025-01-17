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
import {ScreenNames} from '../../navigator/screenNames';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets';
import {MEAL_FILTERS, NEW_RECIPE} from '../../components/data';
import {vh, vw} from '../../theme/dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import styles from './styles';

import {colors} from '../../theme';
import { ThemeContext } from '../../utils/theme-context';

type Recipe = {
  recipe: {
    label: string;
    image: string | null;
    [key: string]: any;
  };
};

const Home = () => {
  const navigation: any = useNavigation();

  const [name, setName] = useState('Krishna Gupta');
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <StatusBar barStyle={'light-content'} />

      <View style={styles.topView}>
        <Image source={Images.top} style={styles.banner} resizeMode='cover' />

        <View style={styles.transparentView}>
          <View style={styles.margin}>
            <Text style={styles.logo}>Hello, {name.split(' ').shift()}</Text>
            <Text style={styles.cookText}>Where you want to shipment today?</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.searchBox}
              >
              <Ionicons name={'search'} size={28} color={'#ccc'} />
              <Text style={styles.placeholder}>Please search here...</Text>
            </TouchableOpacity>
          </View>
         
        </View>
      </View>
    </View>
  );
};

export default Home;
