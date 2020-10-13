import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import languageDetector from './language-detector';

import translationEN from '_assets/locales/en/translation';
import translationDE from '_assets/locales/de/translation';


const resources = {
    en: {
        translation: translationEN
    },
    de: {
        translation: translationDE
    }
}


i18n
    .use(initReactI18next)
    .use(languageDetector)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
                escapeValue: false }
    })

export default i18n; 

