import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import BottomTabNavigator from './TabNavigator';
import {OnboardingNavigator} from './StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {Context as AuthContext} from '../state/AuthContext';

export default function AppNavigation() {
  const {state} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!state.token ? <OnboardingNavigator /> : <BottomTabNavigator />}
    </NavigationContainer>
  );
}
