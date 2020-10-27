import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './TabNavigator';
import { OnboardingNavigator } from './StackNavigator';
import { Context as AuthContext } from '../state/AuthContext';

export default function AppNavigation() {
  const { state, authentication } = useContext(AuthContext);

  useEffect(() => {
    authentication();
  }, []);

  return (
    <NavigationContainer>
      {!state.token ? (
        <OnboardingNavigator />
      ) : (
        <>
          <BottomTabNavigator />
        </>
      )}
    </NavigationContainer>
  );
}
