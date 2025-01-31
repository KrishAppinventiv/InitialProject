import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import {GoogleAuthProvider} from 'firebase/auth';
import { auth, signInWithFirebaseCredential } from "../firebase/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../utils/screenNames";
import { RootStackParamList } from "../utils/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type SigninScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenNames.Signin
>;


export const onGoogleButtonPress = async () => {
    const navigation = useNavigation<SigninScreenNavigationProp>();
    try {
     
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const response = await GoogleSignin.signIn();
      
      const idToken = response?.data?.idToken;

      if (!idToken) {
        throw new Error('No idToken received from Google');
      }

      const googleCredentials = GoogleAuthProvider.credential(idToken);
      await signInWithFirebaseCredential(auth, googleCredentials);
      await AsyncStorage.setItem('isLoggedIn', 'true');

      setTimeout(() => {
        navigation.replace(ScreenNames.BottomTab);
      }, 2000);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in operation is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services not available');
      } else {
        console.error('Error during Google Sign-In:', error);
      }
    }
  };


