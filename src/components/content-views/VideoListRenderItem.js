import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const background1 = require('../../assets/backgrounds/article1.png')

const VideoListRenderItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Video Page')}>
      <Image source={background1} style={styles.itemImage} />
      <View style={styles.itemView}></View>
      <FontAwesomeIcon
        icon={faPlay}
        size={38}
        color="#fff"
        style={styles.itemIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 20,
  },
  itemIcon: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    opacity: 0.9,
  },
  itemView: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#000',
  },
  itemImage: {
    height: 200,
    width: '100%',
    marginBottom: 20,
  },
});

export default VideoListRenderItem;
