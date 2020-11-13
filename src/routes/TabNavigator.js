import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  faPhone,
  faHome,
  faBook,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  EmergencyStackNavigator,
  UserSettingsStackNavigator,
} from './StackNavigator';
import { Context as AuthContext } from '../state/AuthContext';

import SheltersHotlinesTabNavigator from './SheltersHotlinesTabNavigator';
import ResourcesTabNavigator from './ResourcesTabNavigator';

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
            iconName = faPhone;
          } else if (route.name === 'Content') {
            iconName = faBook;
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
        }
      }}
    >
      <>
        {state.token && (
          <Tab.Screen name="Home" component={EmergencyStackNavigator} />
        )}
        <Tab.Screen name="Hotlines" component={SheltersHotlinesTabNavigator} />
        <Tab.Screen name="Content" component={ResourcesTabNavigator} />
        <Tab.Screen
          name="UserSettings"
          component={UserSettingsStackNavigator}
        />
      </>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
