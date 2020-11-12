import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  VideoStackNavigator,
  PodcastStackNavigator,
  ArticleStackNavigator,
} from './StackNavigator';

const Tab = createMaterialTopTabNavigator();

const SheltersHotlinesTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: '#f1d4d4' },
        indicatorStyle: { backgroundColor: '#cc0e74' },
      }}
    >
      <Tab.Screen name="Article" component={ArticleStackNavigator} />
      <Tab.Screen name="Video" component={VideoStackNavigator} />
      <Tab.Screen name="Podcast" component={PodcastStackNavigator} />
    </Tab.Navigator>
  );
};

export default SheltersHotlinesTabNavigator;
