import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SignedInTabNavigator, SignedOutTabNavigator } from './TabNavigator';
import { OnboardingNavigator } from './StackNavigator';
import { Context as AuthContext } from '../state/AuthContext';

export default function AppNavigation() {
  const { state, authentication, checkFirstLaunch } = useContext(AuthContext);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  useEffect(() => {
    authentication();
  }, []);

  return (
    <NavigationContainer>
      {state.isFirstLaunch && <OnboardingNavigator />}
      {!state.token ? <SignedOutTabNavigator /> : <SignedInTabNavigator />}
    </NavigationContainer>
  );
}
