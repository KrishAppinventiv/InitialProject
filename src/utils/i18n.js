import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, fr,german,hindi,japan ,urdu} from "./locales";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';



const resources = {
    en: {
        translation: en,
    },
    fr: {
        translation: fr,
    },
    de: {
        translation: german, 
    },
    ja: {
        translation: japan, 
    },
    hi: {
        translation: hindi, 
    },
    ur:{
        translation: urdu, 
    },
};

i18n.use(initReactI18next).init({
    resources,
    compatibilityJSON: 'v3',
   
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },

    forceRender: true,
});


const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        await i18n.changeLanguage(savedLanguage);
        if (savedLanguage === 'ur') {
          I18nManager.forceRTL(true);
        } else {
          I18nManager.forceRTL(false);
        }
      }
    } catch (error) {
      console.error('Error loading language from AsyncStorage:', error);
    }
  };
  
  // Change language function
  export const changeLanguage = async (langCode) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', langCode);
      await i18n.changeLanguage(langCode);
  
      if (langCode === 'ur') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
  
      RNRestart.Restart(); // Restart app for layout changes
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };
  
  // Call loadLanguage when the app starts
  loadLanguage();
  
export default i18n;