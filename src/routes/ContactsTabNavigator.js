import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  HotlinesStackNavigator,
  MapStackNavigator,
} from './StackNavigator';

const Tab = createMaterialTopTabNavigator();

const ContactsTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: '#f1d4d4' },
        indicatorStyle: { backgroundColor: '#cc0e74' },
      }}
    >
      <Tab.Screen name="Hotlines" component={HotlinesStackNavigator} />
      <Tab.Screen name="Map" component={MapStackNavigator} />
    </Tab.Navigator>
  );
};

export default ContactsTabNavigator;
