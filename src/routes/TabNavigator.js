import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  faPhone,
  faHome,
  faBook,
  faUserCog,
  faMapPin,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  HomeStackNavigator,
  ContentStackNavigator,
  UserSettingsStackNavigator,
  SosContactStackNavigator,
} from './StackNavigator';
import { Context as AuthContext } from '../state/AuthContext';

import SheltersHotlinesTabNavigator from './SheltersHotlinesTabNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { state, authentication } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = faHome;
          } else if (route.name === 'Hotlines') {
            iconName = faMapPin;
          } else if (route.name === 'Content') {
            iconName = faBook;
          } else if (route.name === 'Emergency') {
            iconName = faPhone;
          } else if (route.name === 'UserSettings') {
            iconName = faUserCog;
          }
          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}>
      <>
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Hotlines" component={SheltersHotlinesTabNavigator} />
        <Tab.Screen name="Content" component={ContentStackNavigator} />
        {state.token && (
          <Tab.Screen name="Emergency" component={SosContactStackNavigator} />
        )}
        <Tab.Screen
          name="UserSettings"
          component={UserSettingsStackNavigator}
        />
      </>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
