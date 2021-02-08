import React from 'react';

import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './ArticleCard.styles';


const ArticleCard = ({ item, navigation }) => {
  return (
    <View style={styles.cardView}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Article Page', { id: item._id })}>
        <Text style={styles.title}> {item.title}</Text>
        <Text style={styles.author}>{item.author} </Text>
        <Text style={styles.violence_type}>Tags: {item.violence_type}</Text>
        <Image
          style={styles.image}
          source={item.url_to_image ? { uri: item.url_to_image } : null}
        />
        <Text style={styles.text}>{item.text.substring(0, 150)} ...</Text>
        <Text style={styles.created_at}>Date: {item.created_at}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ArticleCard;
