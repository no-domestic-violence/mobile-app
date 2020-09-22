import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../screens/Onboarding';
import HomeScreen from '../screens/Home';
import SosContactForm from '../screens/SosContactForm';
import Hotlines from '../screens/Hotlines';
import Content from '../screens/Content';

const Stack = createStackNavigator();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator>
      {/* figure out where the right place for onboarding screen  */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    </Stack.Navigator>
  );
};

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SosContactForm" component={SosContactForm} />
    </Stack.Navigator>
  );
};

export const HotlinesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hotlines" component={Hotlines} />
    </Stack.Navigator>
  );
};
export const ContentStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Content" component={Content} />
    </Stack.Navigator>
  );
};
