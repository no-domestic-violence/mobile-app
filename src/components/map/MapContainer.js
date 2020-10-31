import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
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
        <Marker
          coordinate={currentLocation.coords}
        >
          <Image
            source={require('../../assets/images/here.png')}
            style={styles.currentLocation}
          />
        </Marker>
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
  currentLocation: {
    width: 30,
    height: 30,
  },
});

export default MapContainer;
