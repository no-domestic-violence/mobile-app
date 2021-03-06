import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// TODO: refactor imports
import OnboardingScreen from '_screens/Onboarding';
import HomeScreen from '_screens/Home';
import SosContactHome from '_screens/SosContactHome';
import CreateContact from 'screens/CreateContact';
import Hotlines from '_screens/Hotlines';
import ArticlesList from '_screens/ArticlesList';
import ArticlePage from '_screens/ArticlePage';
import VideoList from '_screens/VideoList';
import VideoPage from '_screens/VideoPage';
import PodcastList from '_screens/PodcastList';
import UserSettings from '_screens/UserSettings';
import LoginScreen from '_screens/Login';
import SignUpScreen from '_screens/SignUp';
import MapScreen from '_screens/Map';
import ChangePassword from '_screens/ChangePassword';
import ChangeLanguage from '_screens/ChangeLang';
import UsageInstructions from '_screens/UsageInstructions';
import DeleteAccount from '_screens/DeleteAccount';
import TermsAndConditionsScreen from '_screens/TermsAndConditions';
import { BottomTabNavigator } from './TabNavigator';

const Stack = createStackNavigator();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Language" component={LanguageScreen} /> */}
      <Stack.Screen
        name='TermsAndConditions'
        component={TermsAndConditionsScreen}
      />
      <Stack.Screen name='Onboarding' component={OnboardingScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Sign Up' component={SignUpScreen} />
      <Stack.Screen name='BottomTabNavigator' component={BottomTabNavigator} />
      <Stack.Screen name='User' component={UserSettings} />
    </Stack.Navigator>
  );
};

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
};

export const HotlinesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Hotlines' component={Hotlines} />
    </Stack.Navigator>
  );
};

export const MapStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Map' component={MapScreen} />
    </Stack.Navigator>
  );
};
export const ArticleStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Article List' component={ArticlesList} />
      <Stack.Screen name='Article Page' component={ArticlePage} />
    </Stack.Navigator>
  );
};

export const VideoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Video List' component={VideoList} />
      <Stack.Screen name='Video Page' component={VideoPage} />
    </Stack.Navigator>
  );
};

export const PodcastStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Map' component={PodcastList} />
    </Stack.Navigator>
  );
};

export const SosContactStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='SosContactHome' component={SosContactHome} />
      <Stack.Screen name='CreateContact' component={CreateContact} />
    </Stack.Navigator>
  );
};

export const UserSettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='User' component={UserSettings} />
      <Stack.Screen name='Change Password' component={ChangePassword} />
      <Stack.Screen name='Delete Account' component={DeleteAccount} />
      <Stack.Screen name='Change Language' component={ChangeLanguage} />
      <Stack.Screen name='How to use' component={UsageInstructions} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Sign Up' component={SignUpScreen} />
    </Stack.Navigator>
  );
};
