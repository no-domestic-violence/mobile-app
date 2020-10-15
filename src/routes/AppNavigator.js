import 'react-native-gesture-handler';
import React from 'react';
import BottomTabNavigator from './TabNavigator';
import {OnboardingNavigator} from './StackNavigator';
import {NavigationContainer} from '@react-navigation/native';


export default function AppNavigation() {
  const isLoggedIn = false;
  return (
    <NavigationContainer>
      {!isLoggedIn ? <OnboardingNavigator /> : <BottomTabNavigator />}
    </NavigationContainer>
  );
}
