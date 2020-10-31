import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';

const MapContainer = ({ currentLocation, sheltersList }) => {
  return (
    <View>
      <MapView
        onRegionChange={() => {}}
        style={styles.mapContainer}
        zoomEnabled={true}
        initialRegion={{
          ...currentLocation.coords,
          latitudeDelta: 90,
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
        {sheltersList &&
          sheltersList.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.locs[0],
                longitude: marker.locs[1],
              }}
              title={marker.place_name}
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
