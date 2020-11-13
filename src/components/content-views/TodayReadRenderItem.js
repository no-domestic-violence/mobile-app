import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React, {useRef} from 'react';

const TodayReadRenderItem = ({item}) => {
  const carouselRef = useRef(null);

    return (
        <View>
          <TouchableOpacity
            onPress={() => {
              carouselRef.current.scrollToIndex(index);
            }}>
            <Image source={{ uri: item.image }} style={styles.carouselImage} />
            <Text style={styles.carouselText}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      );
}
const styles = StyleSheet.create({
    carouselImage: {
      width: 200,
      height: 200,
      borderRadius: 20,
      alignSelf: 'center',
    },
    carouselText: {
      paddingLeft: 10,
      color: '#000',
      marginTop: 10,
      bottom: 0,
      left: 0,
      right: 0,
      fontWeight: 'bold',
    },
  });

export default TodayReadRenderItem;;