// Library Imports
import React, { useContext } from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { enableScreens } from 'react-native-screens';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Custom Imports
import Button from '../../components/Button';
import CompletionDetails from '../completion';
import GeneralDetail from '../general';
import PickupDetails from '../pickup';
import Shipment1Detail from '../shipment1';

// Utility Imports
import { ThemeContext } from '../../utils/theme-context';
import { vh } from '../../utils/dimension';

// Style Imports
import styles from './styles';
import { colors } from '../../theme';

enableScreens();

const Tab = createMaterialTopTabNavigator();
const Add = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isDarkMode} = useContext(ThemeContext); 
  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode; 
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex: 1}}>
    <View style={[styles.container,themeStyles]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={28} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('screens.addShipment.title')}</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: vh(14), fontWeight: '500'},
          tabBarIndicatorStyle: {backgroundColor: colors.main, height: vh(4)},
          tabBarStyle: {backgroundColor: colors.navyBlue},
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: colors.main,
          tabBarInactiveTintColor: colors.white,
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
    </KeyboardAvoidingView>
  );
};

export default Add;
