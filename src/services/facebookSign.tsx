import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
  Profile,
} from 'react-native-fbsdk-next';
import {ScreenNames} from '../utils/screenNames';
import {useNavigation} from '@react-navigation/native';

import {RootStackParamList} from '../utils/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type SigninScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenNames.Signin
>;

export const onFacebookButtonPress = async () => {
  const navigation = useNavigation<SigninScreenNavigationProp>();
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    console.log('res', result);
    if (Platform.OS === 'ios') {
      const result = await AuthenticationToken.getAuthenticationTokenIOS();
      console.log(result?.authenticationToken);
    } else {
      const result = await AccessToken.getCurrentAccessToken();
      console.log(result?.accessToken);
    }
    const currentProfile = await Profile.getCurrentProfile();
    if (currentProfile) {
      console.log('current profile', currentProfile);
      await AsyncStorage.setItem('isLoggedIn', 'true');

      setTimeout(() => {
        navigation.replace(ScreenNames.BottomTab);
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  }
};
