import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from 'expo-location';
import { withNavigationFocus } from '@react-navigation/compat';

import MapContainer from 'components/map/';
import { LocationContext } from 'state/';
import { styles } from './Map.styles';

const MapScreen = ({ isFocused }) => {
  const {
    state,
    fetchShelters,
    state: { currentLocation },
    updateCurrentLocation,
  } = useContext(LocationContext);
  const [error, setError] = useState('');

  const askForLocation = async () => {
    try {
      await requestPermissionsAsync();
      await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        (location) => {
          updateCurrentLocation(location);
        }
      );
    } catch (responseError) {
      setError(responseError);
    }
  };

  useEffect(() => {
    askForLocation();
    fetchShelters();
  }, [isFocused]);

  if (!currentLocation || error) {
    return (
      <View>
        <ActivityIndicator size='large' style={styles.loader} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MapContainer
        currentLocation={currentLocation}
        sheltersList={state.shelters_list}
      />
    </View>
  );
};

export default withNavigationFocus(MapScreen);
