import 'react-native-gesture-handler';
import React, {useState} from 'react';
import BottomTabNavigator from './TabNavigator';
import {OnboardingNavigator} from './StackNavigator';





export default function AppNavigation() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  if (!isOnboarded) {
    return <OnboardingNavigator />;
  } else {
    return <BottomTabNavigator />;
  }
}
