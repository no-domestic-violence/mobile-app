import React, {useState, useEffect} from 'react';
import { View, Text, Button, TouchableOpacity} from 'react-native';
import appApiClient from '../../api/appApiClient';

export default function ArticlePage({route , navigation}) {
  console.log(route.params.id)
  const [uniqueArticle, setUniqueArticle] = useState({});
useEffect(() => {
  findOneArticle()
}, []);
  const findOneArticle = async () => {
    try {
      const response = await appApiClient.get(`/articles/${route.params.id}`);
      setUniqueArticle(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
      <View>
        <Text>Here is the different content</Text>
        <Text>{uniqueArticle.author}</Text>
        <Text>{uniqueArticle.created_at}</Text>
        <Text>{uniqueArticle.description}</Text>
        <Text>{uniqueArticle.title}</Text>
        <Text>{uniqueArticle.urlToImage}</Text>
        <Text>{uniqueArticle.violence_type}</Text>
      
      <Button title="Bookmark me !"/>
      <Button onPress={() => goBack()} title="Go back from ArticleScreen" />
      </View>
);
}
    
   
  
