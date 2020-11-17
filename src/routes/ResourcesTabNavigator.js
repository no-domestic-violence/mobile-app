import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  VideoStackNavigator,
  PodcastStackNavigator,
  ArticleStackNavigator,
  HomeStackNavigator
} from './StackNavigator';

const Tab = createMaterialTopTabNavigator();

const ResourcesTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: '#88C4FA' },
        indicatorStyle: { backgroundColor: '#cc0e74' },
      }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Article" component={ArticleStackNavigator} />
      <Tab.Screen name="Video" component={VideoStackNavigator} />
      <Tab.Screen name="Podcast" component={PodcastStackNavigator} />
    </Tab.Navigator>
  );
};

export default ResourcesTabNavigator;
