import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './index.styles';

const TodayReadRenderItem = ({ item, navigation }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Article Page', {
            id: '5fae8c93b9b4bf4a2d4027c8',
          });
        }}>
        <Image source={item.image} style={styles.carouselImage} />
        <Text style={styles.carouselText}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};


export default TodayReadRenderItem;
