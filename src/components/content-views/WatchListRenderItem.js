import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

const WatchListRenderItem = ({ item, background}) => {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={background} style={styles.itemImage} />
      <View style={styles.itemView}></View>
      <FontAwesome5
        name="play"
        size={38}
        color="#fff"
        style={styles.itemIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginRight: 20,
  },
  itemIcon: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    opacity: 0.9,
  },
  itemView: {
    position: 'absolute',
    height: 5,
    width: '100%',
    backgroundColor: '#02ad94',
    opacity: 0.8,
  },
  itemImage: {
    height: 300,
    width: 200,
  },
});

export default WatchListRenderItem;
