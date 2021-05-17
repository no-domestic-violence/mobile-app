import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, FlatList } from 'react-native';
import ArticleCard from 'components/content/';
import appApiClient from 'api/';

export default function Content({ navigation }) {
  const [blog, setBlog] = useState([]);
  const isFocused = useIsFocused();

  const getArticles = async () => {
    try {
      const response = await appApiClient.getArticlesData();
      setBlog([...response.data.articles]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, [isFocused]);

  if (!blog) {
    return null;
  }
  return (
    <View>
      <FlatList
        data={blog}
        keyExtractor={(item, index) => `key${index}`}
        renderItem={({ item }) => {
          return <ArticleCard testID='articleItem' item={item} navigation={navigation} />;
        }}
      />
    </View>
  );
}
