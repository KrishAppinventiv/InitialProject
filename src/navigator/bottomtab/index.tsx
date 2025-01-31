import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Add from '../../screens/add';
import Home from '../../screens/Home';
import Notification from '../../screens/notification';
import Save from '../../screens/save';
import Setting from '../../screens/setting';
import { colors } from '../../theme';
import { vh } from '../../utils/dimension';
import { ScreenNames } from '../../utils/screenNames';
import { ThemeContext } from '../../utils/theme-context';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { isDarkMode} = useContext(ThemeContext); 
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          shadowColor: 'rgba(0,0,0,.1)',
          shadowOpacity: 6,
          backgroundColor: isDarkMode?colors.white:colors.dark,
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
              <Ionicons name={'home'} size={28} color={focused?colors.main:colors.lightGrey} style={{height:vh(40)}}/>
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
               <Fontisto name={'favorite'} size={26} color={focused?colors.main:colors.lightGrey}  style={{height:vh(40)}} />
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
             <Ionicons name={'add-circle'} size={60} color={focused?colors.main:colors.lightGrey}  style={{height:vh(63),width:vh(63),marginBottom:vh(8)}}/>
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
             <Ionicons name={'notifications'} size={28} color={focused?colors.main:colors.lightGrey}  style={{height:vh(40)}}/>
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
               <Ionicons name={'settings-sharp'} size={28} color={focused?colors.main:colors.lightGrey}  style={{height:vh(40)}}/>
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