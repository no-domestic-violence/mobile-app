import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

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

const styles = StyleSheet.create({
  itemContainer: {
    margin: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderColor: 'grey',
  },
  itemIcon: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
  itemImage: {
    height: 200,
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default VideoListRenderItem;
