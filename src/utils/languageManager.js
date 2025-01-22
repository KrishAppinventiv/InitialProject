
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import i18n from './i18n';



// export const changeLanguage = async (langCode) => {
//   try {
//     await AsyncStorage.setItem('selectedLanguage', langCode); 
//     console.log('langcode',langCode)
//     i18n.changeLanguage(langCode); 
//     if (langCode === 'ur') {
//       I18nManager.forceRTL(true);
//     } else {
//       I18nManager.forceRTL(false);
//     }

    
//     RNRestart.Restart();
//   } catch (error) {
//     console.error('Error saving language to AsyncStorage', error);
//   }
// };


// export const loadLanguage = async () => {
//   try {
//     const language = await AsyncStorage.getItem('selectedLanguage');
//     if (language) {
//       i18n.changeLanguage(language);
//     }
//   } catch (error) {
//     console.error('Error loading language from AsyncStorage', error);
//   }
// };
