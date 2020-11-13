import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const VideoListRenderItem = ({ item, onPressItem, navigation }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPressItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemView}></View>
      <FontAwesome5
        name="play"
        size={38}
        color="#fff"
        style={styles.itemIcon}
      />
      {/* TODO : fix it with click on video */}
      {/* <Button
            title="Go to video"
            onPress={() =>
              navigation.navigate('Video Page')
            }
          /> */}
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
    position: 'absolute',
    height: 5,
    width: '100%',
    backgroundColor: '#02ad94',
    opacity: 0.8,
  },
  itemImage: {
    height: 200,
    width: '100%',
    marginBottom: 20,
  },
});

export default VideoListRenderItem;
