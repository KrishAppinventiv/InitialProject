import React, { useContext } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ScreenNames} from '../screenNames';

import Save from '../../screens/save';
import Notification from '../../screens/notification';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Images} from '../../assets';
import Setting from '../../screens/setting';
import Add from '../../screens/add';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../theme';
import Home from '../../screens/Home';
import { vh } from '../../theme/dimensions';
import { ThemeContext } from '../../utils/theme-context';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          shadowColor: 'rgba(0,0,0,.1)',
          shadowOpacity: 6,
          backgroundColor: isDarkMode?"#ffffff":'#2d3040',
          justifyContent:'center',
          alignItems:'center',
          paddingTop:vh(10)
        },
      }}>
      <Tab.Screen
        component={Home}
        name={ScreenNames.Home}
        options={{
          tabBarIcon: ({focused}) => (
            
            <View style={styles.normalIcon}>
              <Ionicons name={'home'} size={28} color={focused?colors.main:'#ccc'} style={{height:vh(40)}}/>
            </View>
           
          ),
        }}
      />
      <Tab.Screen
        component={Save}
        name={ScreenNames.Save}
        options={{
          tabBarIcon: ({focused}) => (
           
            <View style={styles.normalIcon}>
               <Fontisto name={'favorite'} size={26} color={focused?colors.main:'#ccc'}  style={{height:vh(40)}} />
            </View>
           
          ),
        }}
      />
      <Tab.Screen
        component={Add}
        name={ScreenNames.Add}
        options={{
          tabBarIcon: ({focused}) => (
            
            <View style={styles.addIcon}>
             <Ionicons name={'add-circle'} size={70} color={focused?colors.main:'#ccc'}  style={{height:vh(70),width:vh(70)}}/>
            </View>
          
          ),
        }}
      />
      <Tab.Screen
        component={Notification}
        name={ScreenNames.Notify}
        options={{
          tabBarIcon: ({focused}) => (
            
            <View style={styles.normalIcon}>
             <Ionicons name={'notifications'} size={28} color={focused?colors.main:'#ccc'}  style={{height:vh(40)}}/>
            </View>
            
          ),
        }}
      />
      <Tab.Screen
        component={Setting}
        name={ScreenNames.Profile}
        options={{
          
          tabBarIcon: ({focused}) => (
            
            <View style={styles.normalIcon}>
               <Ionicons name={'settings-sharp'} size={28} color={focused?colors.main:'#ccc'}  style={{height:vh(40)}}/>
            </View>
           
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 

export default BottomTabNavigator;

const styles = StyleSheet.create({
  normalImg: {
    height: 28,
    width: 28,
  },
  addImg: {
    height:65,
    aspectRatio: 1,
  },
  addIcon: {
    marginBottom:vh(20),
  },
  normalIcon: {
    marginTop: 10,
   
  },
})