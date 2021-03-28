import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from 'state/';
import { BottomTabNavigator } from './TabNavigator';
import { OnboardingNavigator } from './StackNavigator';

export default function AppNavigation() {
  const { state, authentication, setAlreadyLaunchedValue } = useContext(
    AuthContext
  );
  const [checkedSecureStorage, setCheckedSecureStorage] = useState(false);

  useEffect(() => {
    setAlreadyLaunchedValue();
    setCheckedSecureStorage(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    authentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
