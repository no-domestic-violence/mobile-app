import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LanguageScreen from '_screens/Language';
import OnboardingScreen from '_screens/Onboarding';
import HomeScreen from '_screens/Home';
import SosContactForm from '_screens/SosContactForm';
import Hotlines from '_screens/Hotlines';
import Content from '_screens/Content';
import BottomTabNavigator from './TabNavigator';
import LoginScreen from '_screens/Login';


const Stack = createStackNavigator();

export const OnboardingNavigator = () => {


  const [languageSelected, setLanguageSelect] = useState(false);

  const handleLanguageSelect = () => {
    // TODO: implement real localization mechanism 
    setLanguageSelect(true);
  }  

  return (
    <Stack.Navigator>
      {languageSelected ? (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Home" component={BottomTabNavigator} />
        </>
        ) : (
          <Stack.Screen name="Language">
          {(props) => (
          <LanguageScreen {...props} onLanguageSelect={handleLanguageSelect} />
          )}
          </Stack.Screen>
        )}            
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
