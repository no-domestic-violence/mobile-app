import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  VideoStackNavigator,
  PodcastStackNavigator,
  ArticleStackNavigator,
  HomeStackNavigator,
} from './StackNavigator';
import { Colors } from '../styles/'


const Tab = createMaterialTopTabNavigator();

const ResourcesTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 13, color: '#fff' },
        style: { backgroundColor: Colors.darkBlue },
        indicatorStyle: { backgroundColor: '#fff' },
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
