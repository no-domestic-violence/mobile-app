import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../../state/AuthContext';
import { StyledView } from '../../styles/shared/StyledView';
import UserInfo from '_components/user-settings/';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { LanguageContext } from '../../state/LanguageContext';
import { Button } from 'react-native-elements';

export default function ChangeLanguage({ navigation }) {
  const { state } = useContext(AuthContext);
  const { availableLanguages, setAppLanguage } = useContext(LanguageContext);
  const username = state.username;

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
          color={'#000'}
          style={styles.arrow}
        />
        <Text style={styles.header}>Change Language</Text>
        <View style={styles.buttonsView}>
          {availableLanguages.map((item, i) => (
            <Button
              title={item.name}
              titleStyle={{ color: '#000000' }}
              type="solid"
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

const styles = StyleSheet.create({
  userSettingsContainer: {
    alignItems: 'flex-start',
  },
  arrow: {
    alignSelf: 'flex-start',
    marginTop: 50,
    marginLeft: 10,
  },
  button: {
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 40,
    marginTop: 40,
  },
});
