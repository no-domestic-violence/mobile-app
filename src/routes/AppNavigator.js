import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './TabNavigator';
import { OnboardingNavigator } from './StackNavigator';
import { AuthContext } from 'state/';

export default function AppNavigation() {
  const { state, authentication, checkFirstLaunch } = useContext(AuthContext);
  const [checkedSecureStorage, setCheckedSecureStorage] = useState(false);

  useEffect(() => {
    checkFirstLaunch();
    setCheckedSecureStorage(true);
  }, []);

  useEffect(() => {
    authentication();
  }, []);

  return (
    <NavigationContainer>
      {checkedSecureStorage && state.isFirstLaunch && !state.token ? (
        <OnboardingNavigator />
      ) : (
        <BottomTabNavigator />
      )}
    </NavigationContainer>
  );
}
