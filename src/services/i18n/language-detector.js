import * as Localization from 'expo-localization';


const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: (callback) => {
        callback(Localization.locale.split('-')[0]);
    },
    init: () => { },
    cacheUserLanguage: () => { },
 };


export default languageDetector;

