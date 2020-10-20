import * as Localization from 'expo-localization';

export const DEFAULT_LANGUAGE = Localization.locale.split('-')[0];

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    callback(DEFAULT_LANGUAGE);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

export default languageDetector;
