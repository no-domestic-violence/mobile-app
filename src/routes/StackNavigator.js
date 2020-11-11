import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// TODO: refactor imports
import LanguageScreen from '_screens/Language';
import OnboardingScreen from '_screens/Onboarding';
import HomeScreen from '_screens/Home';
import SosContactForm from '_screens/SosContactForm';
import Hotlines from '_screens/Hotlines';
import Content from '_screens/Content';
import UserSettings from '_screens/UserSettings';
import LoginScreen from '_screens/Login';
import SignUpScreen from '_screens/SignUp';
import MapScreen from '_screens/Map';
import TermsAndConditionsScreen from '_screens/TermsAndConditions';
import BottomTabNavigator from './TabNavigator';
import Assess from '_screens/Assess';
const Stack = createStackNavigator();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen}/>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Home" component={BottomTabNavigator} />
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Hotlines" component={Hotlines} />
    </Stack.Navigator>
  );
};

export const MapStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Map" component={MapScreen} />
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
export const UserSettingsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Content" component={UserSettings} />
    </Stack.Navigator>
  );
};
export const AssessStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Assess" component={Assess} />
    </Stack.Navigator>
  );
};