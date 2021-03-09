import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import UserInfo from '_components/user-info/';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button } from 'react-native-elements';
import { LanguageContext } from '../../state/LanguageContext';
import { StyledView } from '../../styles/shared/StyledView';
import { AuthContext } from 'state/';
import { styles } from './ChangeLang.styles';

export default function ChangeLanguage({ navigation }) {
  const { state } = useContext(AuthContext);
  const { availableLanguages, setAppLanguage } = useContext(LanguageContext);
  const {username} = state;

  const handleLanguageChange = async (language) => {
    await setAppLanguage(language);
    navigation.goBack();
  };

  return (
    <StyledView style={styles.userSettingsContainer}>
      <UserInfo username={username} />
      <View style={styles.view}>
        <FontAwesomeIcon
          onPress={() => navigation.goBack()}
          icon={faAngleLeft}
          size={40}
          color="#000"
          style={styles.arrow}
        />
        <Text style={styles.header}>Change Language</Text>
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
    </StyledView>
  );
}


