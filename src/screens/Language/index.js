import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import LanguageSVG from '_assets/svg/language.svg';
import { useTranslation } from 'react-i18next';
import i18n from '../../services/i18n';
import { LanguageContext } from '../../state/LanguageContext';

export default function LanguageScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const { availableLanguages, setAppLanguage } = useContext(LanguageContext);

  const handleLanguageChange = async (language) => {
    await setAppLanguage(language);
    navigation.navigate('TermsAndConditions');
  };

  return (
    <>
      <View style={styles.homePageView}>
        <LanguageSVG style={{ position: 'absolute' }} />
        <View style={styles.buttonsView}>
          {availableLanguages.map((item, i) => (
            <Button
              title={item.name}
              titleStyle={{ color: '#000000' }}
              type='solid'
              raised
              containerStyle={styles.button}
              buttonStyle={styles.buttonText}
              key={i}
              onPress={() => handleLanguageChange(item.lang)}
            />
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  homePageView: {
    backgroundColor: '#CADEEE',
    flex: 1,
    justifyContent: 'center',
  },
  buttonsView: {
    alignItems: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
});
