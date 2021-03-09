import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { apiInstance } from 'api/';
import { styles } from './ArticlePage.styles';

export default function ArticlePage({ route, navigation }) {
  const [uniqueArticle, setUniqueArticle] = useState({});

  const findOneArticle = async () => {
    try {
      const response = await apiInstance.get(`/articles/${route.params.id}`);
      setUniqueArticle(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    findOneArticle();
  }, []);

  return (
    <ScrollView>
      <View style={styles.cardView}>
        <Text style={styles.title}>{uniqueArticle.title}</Text>
        <Image
          style={styles.image}
          source={
            uniqueArticle.url_to_image
              ? { uri: uniqueArticle.url_to_image }
              : null
          }
        />
        <Text style={styles.text}>{uniqueArticle.text}</Text>
        <Text style={styles.author}>Written by: {uniqueArticle.author}</Text>
        <Text style={styles.created_at}>Date: {uniqueArticle.created_at}</Text>
        <Text style={styles.violence_type}>
          Violence Type: {uniqueArticle.violence_type}
        </Text>

        <Button title='Add to favorites' />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonLabel}>Back to Articles</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


