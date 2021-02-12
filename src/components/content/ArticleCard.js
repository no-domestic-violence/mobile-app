import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

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

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: 'white',
    margin: width * 0.03,
    borderRadius: width * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  title: {
    marginHorizontal: width * 0.05,
    marginVertical: width * 0.03,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    marginVertical: width * 0.05,
    marginHorizontal: width * 0.02,
    color: 'black',
    fontSize: 18,
    textAlign: 'justify',
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    height: height / 6,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    marginVertical: height * 0.02,
  },
  author: {
    marginBottom: width * 0.0,
    marginHorizontal: width * 0.0,
    fontSize: 15,
    color: 'black',
    marginLeft: 20,
  },
  violence_type: {
    marginBottom: width * 0.0,
    marginHorizontal: width * 0.05,
    fontSize: 12,
    color: 'dimgray',
    textAlign: 'right',
  },
  created_at: {
    marginHorizontal: width * 0.5,
    marginBottom: 20,
    fontSize: 11,
    color: 'dimgray',
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20,
    marginTop: -8,
  },
});

export default ArticleCard;

ArticleCard.propTypes = {
  item: PropTypes.object.isRequired,
};
