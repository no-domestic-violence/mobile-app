import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  faPhone,
  faHome,
  faUserCog,
  faMapPin,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  UserSettingsStackNavigator,
  SosContactStackNavigator,
} from './StackNavigator';
import { Context as AuthContext } from '../state/AuthContext';

import SheltersHotlinesTabNavigator from './SheltersHotlinesTabNavigator';
import ResourcesTabNavigator from './ResourcesTabNavigator';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const { state } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = faHome;
          } else if (route.name === 'Hotlines') {
            iconName = faMapPin;
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
        style: {
          backgroundColor: '#FEF8E3',
        },
      }}>
      {!state.token ? (
        <>
          <Tab.Screen name='Home' component={ResourcesTabNavigator} />
          <Tab.Screen
            name='Hotlines'
            component={SheltersHotlinesTabNavigator}
          />
          <Tab.Screen
            name='UserSettings'
            component={UserSettingsStackNavigator}
          />
        </>
      ) : (
        <>
          <Tab.Screen name='Home' component={ResourcesTabNavigator} />
          <Tab.Screen
            name='Hotlines'
            component={SheltersHotlinesTabNavigator}
          />
          <Tab.Screen name='Emergency' component={SosContactStackNavigator} />
          <Tab.Screen
            name='UserSettings'
            component={UserSettingsStackNavigator}
          />
        </>
      )}
    </Tab.Navigator>
  );
};
