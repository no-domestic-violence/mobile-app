import React, { createContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import i18n from 'services/i18n';
import PropTypes from 'prop-types';
import { DEFAULT_LANGUAGE } from '../services/i18n/language-detector';

const APP_LANGUAGE = 'lang';

const availableLanguages = [
  { lang: 'en', name: 'English' },
  { lang: 'de', name: 'German' },
];

export const LanguageContext = createContext({
  availableLanguages,
  appLanguage: DEFAULT_LANGUAGE,
  setAppLanguage: () => {},
  initializeAppLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

  const setLanguage = async (language) => {
    i18n.changeLanguage(language);
    setAppLanguage(language);
    SecureStore.setItemAsync(APP_LANGUAGE, language);
  };

  const initializeAppLanguage = async () => {
    const currentLanguage = await SecureStore.getItemAsync(APP_LANGUAGE);
    if (!currentLanguage) {
      setLanguage(DEFAULT_LANGUAGE);
    } else {
      setLanguage(currentLanguage);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        availableLanguages,
        setAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,
      }}>
      {children}
    </LanguageContext.Provider>
  );
};
LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
