import { I18nManager } from "react-native";
import i18n from "./i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const validateField = (
    value: string,
    setError: (msg: string) => void,
    fieldName: string,
  ) => {
    if (!value.trim()) {
      setError(`${fieldName} is required`);
      return false;
    }
    setError('');
    return true;
  };
  

 export const handleLogout = async () => {
   
    await AsyncStorage.removeItem('isLoggedIn');
    try {
      await AsyncStorage.setItem('selectedLanguage', 'en');
      i18n.changeLanguage('en');
      I18nManager.forceRTL(false);
    } catch (error) {
      console.error('Error resetting language to English', error);
    }
   
  };

 export const selectLanguage = async (langCode: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('selectedLanguage', langCode);
      i18n.changeLanguage(langCode);
      if (langCode === 'ur') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
   
    } catch (error) {
      console.error('Error saving language to AsyncStorage', error);
    }
  };

 export const validateShipment = (
    value: string,
    setError: (msg: string) => void,
    fieldName: string,
  ) => {
    if (!value.trim()) {
      setError(`${fieldName} is required`);
      return false;
    }
    setError('');
    return true;
  };