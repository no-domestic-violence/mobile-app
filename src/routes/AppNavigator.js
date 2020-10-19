import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import BottomTabNavigator from './TabNavigator';
import {OnboardingNavigator} from './StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {AppContext} from '../state';

export default function AppNavigation() {
  const {t, i18n, userToken} = useContext(AppContext);
  return (
    <NavigationContainer screenProps={{t, i18n}}>
      {!userToken ? <OnboardingNavigator /> : <BottomTabNavigator />}
    </NavigationContainer>
  );
}
