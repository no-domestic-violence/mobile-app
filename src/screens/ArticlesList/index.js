import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import ArticleCard from 'components/content/ArticleCard'
import appApiClient from '../../api/appApiClient';

export default function Content({ navigation}) {
const [blog, setBlog] = useState([]);
useEffect(() => {
  getArticles()
}, []);

const getArticles = async () => {
  try {
    const response = await appApiClient.get(`/articles`);
    setBlog([...response.data]);
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
if (!blog) {
  return null
}
return (
  <View>
    <FlatList data={blog}
      keyExtractor={(item, index) => 'key' + index}
      renderItem={({item}) => {
        return <ArticleCard item = {item} navigation={navigation}/>
      }}
    />
  </View>
 )
}