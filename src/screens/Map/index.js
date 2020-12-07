import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from 'expo-location';
import { withNavigationFocus } from '@react-navigation/compat';

import MapContainer from '_components/map/MapContainer';
import { Context as LocationContext } from '_state/LocationContext';

const MapScreen = ({ isFocused }) => {
  const {
    state,
    fetchShelters,
    state: { currentLocation },
    updateCurrentLocation,
  } = useContext(LocationContext);
  //TODO: handle errros
  const [error, setError] = useState({});

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
        },
      );
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    askForLocation();
    fetchShelters();
  }, [isFocused]);

  if (!currentLocation) {
    return (
      <View>
        <ActivityIndicator size="large" style={styles.loader} />
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loader: {
    flex: 1,
  },
});

export default withNavigationFocus(MapScreen);
