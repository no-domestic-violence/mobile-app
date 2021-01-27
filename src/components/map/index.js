import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './MapContainer.styles';
import MapView, { Marker } from 'react-native-maps';

const MapContainer = React.memo(({ currentLocation, sheltersList }) => {
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
        <Marker coordinate={currentLocation.coords}>
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
                longitude: marker.locs[0],
                latitude: marker.locs[1],
              }}
              title={marker.place_name}
              description={marker.description}
            />
          ))}
      </MapView>
    </View>
  );
});

export default MapContainer;

MapContainer.propTypes = {
  currentLocation: PropTypes.object.isRequired,
  sheltersList: PropTypes.array,
};