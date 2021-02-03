import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import LanguageSVG from '_assets/svg/language.svg';
import { LanguageContext } from '../../state/LanguageContext';
import { styles } from './Language.styles';

export default function LanguageScreen({ navigation }) {
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


