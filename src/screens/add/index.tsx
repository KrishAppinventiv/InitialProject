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

enableScreens();

const Tab = createMaterialTopTabNavigator();
const Add = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 
  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode; 
  return (
    <View style={[styles.container,themeStyles]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={28} color={'#ffffff'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Shipment1</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: vh(14), fontWeight: '500'},
          tabBarIndicatorStyle: {backgroundColor: '#72A0C1', height: vh(4)},
          tabBarStyle: {backgroundColor: '#323E47', height: '8%'},
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: '#72A0C1',
          tabBarInactiveTintColor: '#ffffff',
        }}>
        <Tab.Screen name="General Detail" component={GeneralDetail} />
        <Tab.Screen name="Shipment1 Detail" component={Shipment1Detail} />
        <Tab.Screen name="Pickup Details" component={PickupDetails} />
        <Tab.Screen name="Completion Details" component={CompletionDetails} />
      </Tab.Navigator>

      <Button
        onPress={() => null}
        style={styles.footer}
        text="Next"
        disabled={false}
      />
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    // backgroundColor: '#2d3040',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#323E47',
    padding: vh(10),
    paddingTop: vh(14),
  },
  backButton: {
    color: '#ffffff',
    fontSize: 16,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: vh(15),
    fontWeight: 'bold',
    marginStart: vh(17),
  },
  footer: {
    backgroundColor: '#72A0C1',
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: vh(20),
  },
  lightMode:{
    backgroundColor:colors.white
  },
  darkMode:{
    backgroundColor: '#2d3040',
  },
  
});
