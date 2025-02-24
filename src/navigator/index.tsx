import SplashScreen from '../screens/splashScreen';

import React from 'react';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import Signin from '../screens/signin';
import Signup from '../screens/signup';
import Tutorial from '../screens/tutorial';
import VerifyOtp from '../screens/verifyOtp';
import {ScreenNames} from '../utils/screenNames';
import {RootStackParamList} from '../utils/types';
import BottomTabNavigator from './bottomtab';
import ChatScreen from '../screens/chat';
import UserChat from '../screens/userChat';
import Search from '../screens/search';
import GroupChat from '../screens/groupChat';
import GroupChatting from '../screens/groupChatting';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const navigationRef: any = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          component={SplashScreen}
          name={ScreenNames.Splash}
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={Signin}
          name={ScreenNames.Signin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={VerifyOtp}
          name={ScreenNames.Otp}
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={Tutorial}
          name={ScreenNames.Tutorial}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Signup}
          name={ScreenNames.Signup}
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={BottomTabNavigator}
          name={ScreenNames.BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Login}
          name={ScreenNames.Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={ChatScreen}
          name={ScreenNames.Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={UserChat}
          name={ScreenNames.UserChat}
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={Search}
          name={ScreenNames.Search}
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={GroupChat}
          name={ScreenNames.GroupChat}
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={GroupChatting}
          name={ScreenNames.GroupChatting}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
