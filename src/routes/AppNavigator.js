import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import BottomTabNavigator from './TabNavigator';
import {OnboardingNavigator} from './StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {AppContext} from '../state'


export default function AppNavigation() {
  //we dont need this code anymore
  const {userToken} = useContext(AppContext)
  return (
      <NavigationContainer>
        {!userToken ? <OnboardingNavigator /> : <BottomTabNavigator />}
      </NavigationContainer>
  );
}
