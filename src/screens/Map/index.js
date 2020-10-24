import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from 'expo-location';
import MapContainer from '_components/map/MapContainer';

const MapScreen = () => {
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
          console.log(location);
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
      <MapContainer />
      {/* how to handle errors here ?  */}
      {/* {error ? <Text>Can you enable location services</Text> : null} */}
    </View>
  );
};
const styles = StyleSheet.create({});

export default MapScreen;
