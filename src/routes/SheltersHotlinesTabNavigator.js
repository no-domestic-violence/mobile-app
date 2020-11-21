import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  HotlinesStackNavigator,
  MapStackNavigator,
} from './StackNavigator';

import { Colors } from '../styles/'

const Tab = createMaterialTopTabNavigator();

const SheltersHotlinesTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 14, color: '#fff' },
        style: { backgroundColor: Colors.darkBlue },
        indicatorStyle: { backgroundColor: '#fff' },
      }}
    >
      <Tab.Screen name="Hotlines" component={HotlinesStackNavigator} />
      <Tab.Screen name="Map" component={MapStackNavigator} />
    </Tab.Navigator>
  );
};

export default SheltersHotlinesTabNavigator;
