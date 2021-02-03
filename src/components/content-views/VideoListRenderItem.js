import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { styles } from './index.styles';

const VideoListRenderItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Video Page', { params: item })}>
      <Image source={item.image} style={styles.itemImage} />
      <FontAwesomeIcon
        icon={faPlay}
        size={38}
        color='#415889'
        style={styles.itemIcon}
      />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default VideoListRenderItem;
