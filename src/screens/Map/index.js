import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from 'expo-location';
import MapContainer from '_components/map/MapContainer';
import { Context as LocationContext } from '../../state/LocationContext'

const MapScreen = () => {
const { state: {currentLocation}, updateCurrentLocation } = useContext(LocationContext)
// console.log(currentLocation)
  const [error, setError] = useState(null);
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
  }, []);

  return (
    <View>
      <MapContainer currentLocation = {currentLocation} />
      {/* TODO: how to handle errors here ?  */}
      {/* {error ? <Text>Can you enable location services</Text> : null} */}
    </View>
  );
};
const styles = StyleSheet.create({});

export default MapScreen;
