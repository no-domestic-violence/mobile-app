import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18next from 'i18next';
import BottomTabNavigator from './TabNavigator';
import { OnboardingNavigator } from './StackNavigator';
import { Context as AuthContext } from '../state/AuthContext';

export default function AppNavigation() {
  const { state } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  return (
    <I18nextProvider i18n={i18next}>
      <NavigationContainer screenProps={{ t, i18n }}>
        {!state.token ? <OnboardingNavigator /> : <BottomTabNavigator />}
      </NavigationContainer>
    </I18nextProvider>
  );
}
