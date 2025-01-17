import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, fr,german,hindi,japan ,urdu} from "./locales";




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
export default i18n;