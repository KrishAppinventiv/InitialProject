import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {enableScreens} from 'react-native-screens';
import GeneralDetail from '../general';
import Shipment1Detail from '../shipment1';
import PickupDetails from '../pickup';
import CompletionDetails from '../completion';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {vh} from '../../theme/dimensions';
import Button from '../../components/Button';
import {colors} from '../../theme';
import { ThemeContext } from '../../utils/theme-context';
import { useTranslation } from 'react-i18next';
import styles from './styles';

enableScreens();

const Tab = createMaterialTopTabNavigator();
const Add = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 
  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode; 
  return (
    <View style={[styles.container,themeStyles]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={28} color={'#ffffff'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('screens.addShipment.title')}</Text>
      </View>
      <Tab.Navigator
        
        screenOptions={{
          tabBarLabelStyle: {fontSize: vh(14), fontWeight: '500'},
          tabBarIndicatorStyle: {backgroundColor: '#72A0C1', height: vh(4)},
          tabBarStyle: {backgroundColor: '#323E47'},
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: '#72A0C1',
          tabBarInactiveTintColor: '#ffffff',
        }}>
        <Tab.Screen name="General Detail" component={GeneralDetail} options={{ title: t('screens.addShipment.generalDetail') }} />
        <Tab.Screen name="Shipment1 Detail" component={Shipment1Detail}  options={{ title: t('screens.addShipment.shipmentDetail') }} />
        <Tab.Screen name="Pickup Details" component={PickupDetails} options={{ title: t('screens.addShipment.pickupDetails') }}/>
        <Tab.Screen name="Completion Details" component={CompletionDetails} options={{ title: t('screens.addShipment.completionDetails') }} />
      </Tab.Navigator>

      <Button
        onPress={() => null}
        style={styles.footer}
        text={t('screens.addShipment.next')}
        disabled={false}
      />
    </View>
  );
};

export default Add;
