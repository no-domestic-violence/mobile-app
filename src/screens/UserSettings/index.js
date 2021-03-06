import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from 'state/';
import { StyledView } from 'styles/shared/StyledView';
import UserInfo from '_components/user-info';
import { useTranslation } from 'react-i18next';
import { styles } from './UserSettings.styles';

export default function UserSettings({ navigation }) {
  const { t } = useTranslation();
  const { state, signout } = useContext(AuthContext);
  const { username, token } = state;
  const handleSignOut = () => {
    signout();
  };
  return (
    <StyledView style={styles.userSettingsContainer}>
      <UserInfo username={t('common.hello_user', { username })} />
      <View style={styles.userSettingsActionsView}>
        <TouchableOpacity onPress={() => navigation.navigate('How to use')}>
          <Text style={styles.userSettingsActions}>
            {t('common.how-to-use')}
          </Text>
        </TouchableOpacity>
        {token ? (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('Change Password')}>
              <Text style={styles.userSettingsActions}>
                {t('common.change-password')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Change Language')}>
              <Text style={styles.userSettingsActions}>
                {t('common.change-language')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Delete Account')}>
              <Text style={styles.userSettingsActions}>
                {t('common.delete-account')}
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
      {!token ? (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.button}>{t('common.login')}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleSignOut()}>
          <Text style={styles.button}>{t('common.logout')}</Text>
        </TouchableOpacity>
      )}
    </StyledView>
  );
}
