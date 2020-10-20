import React, { useState, useContext } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../../services/i18n';
import { LanguageContext } from '../../state/LanguageContext';

export default function LanguageScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const { availableLanguages, setAppLanguage } = useContext(LanguageContext);

  const [languageSelected, setLanguageSelect] = useState(false);
  const handleLanguageSelect = () => setLanguageSelect(true);

  const handleLanguageChange = async (language) => {
    setAppLanguage(language);
    handleLanguageSelect();
  };

  return (
    <View>
      <Text>{t('common.welcome')}</Text>
      <Text>{t('common.language')}</Text>
      {availableLanguages.map((item, i) => (
        <Button
          key={i}
          title={item.name}
          onPress={() => handleLanguageChange(item.lang)}></Button>
      ))}
      {
        languageSelected && (
          <Button
            title="Next"
            onPress={() => navigation.navigate('TermsAndConditions')}
          />
        )
        //TODO: Add popup when user doesn't select a Language and proceed
        //TODO: Change language of NEXT button when german is pressed
      }
    </View>
  );
}
