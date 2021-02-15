import 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './TabNavigator';
import { OnboardingNavigator } from './StackNavigator';
import { Context as AuthContext } from '../state/AuthContext';

export default function AppNavigation() {
  const { state, authentication, checkFirstLaunch } = useContext(AuthContext);

  useEffect(() => {
    checkFirstLaunch();
    authentication();
  }, []);

  return (
    <NavigationContainer>
      {state.isFirstLaunch ? (
        <OnboardingNavigator />
      ) : (
        <>
          <BottomTabNavigator />
        </>
      )}
    </NavigationContainer>
  );
}
