import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { styles } from './index.styles';

const WatchListRenderItem = ({ item, background }) => {
  return (
    <TouchableOpacity style={styles.watchItemContainer}>
      <Image source={background} style={styles.watchItemImage} />
      <View style={styles.watchItemView} />
      <FontAwesomeIcon
        icon={faPlay}
        size={38}
        color='#fff'
        style={styles.watchItemImage}
      />
    </TouchableOpacity>
  );
};


export default WatchListRenderItem;
