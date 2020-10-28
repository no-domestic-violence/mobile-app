import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';

const MapContainer = ({ currentLocation }) => {
  if (!currentLocation) {
    return null;
  }
  //hardcoded location for now
  const markers = [{
    coordinate: {
      latitude: 52.523,
      longitude: 13.406417
    },
    title: 'Test test',
    description: "Here is descr"

  }]
  return (
    <View>
      <MapView
        onRegionChange={() => {}}
        style={styles.mapContainer}
        initialRegion={{
          ...currentLocation.coords,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        // ??? center to germany
        // region={{
        //   ...currentLocation.coords,
        //   latitudeDelta: 0.1,
        //   longitudeDelta: 0.1,
        // }}
      >
        <Circle
          center={currentLocation.coords}
          radius={50}
          strokeColor="#cc0e74"
          fillColor="#f1d4d4"
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  mapContainer: {
    height: '100%',
  },
});

export default MapContainer;
