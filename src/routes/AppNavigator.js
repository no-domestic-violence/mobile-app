import 'react-native-gesture-handler';
import React, {useState, useMemo} from 'react';
import BottomTabNavigator from './TabNavigator';
import {OnboardingNavigator} from './StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context';

export default function AppNavigation() {
  //we dont need this code anymore
  const [userToken, setUserToken] = useState(null);
  const authContext = useMemo(() => {
    return {
      logIn: () => {
        setUserToken('tokenishere');
      },
      signUp: () => {
        setUserToken('tokenishere');
      },
      signOut: () => {
        setUserToken('');
      },
    };
  });
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {!userToken ? <OnboardingNavigator /> : <BottomTabNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
