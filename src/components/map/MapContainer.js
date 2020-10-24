import React from 'react';
import {StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const MapContainer = () => {
  return (
    <View>
      <MapView
        style={styles.mapContainer}
        initialRegion={{
          latitude: 52.52,
          longitude: 13.405,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mapContainer: {
    height: '100%',
  },
});

export default MapContainer;