import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Button, FlatList } from 'react-native'
import NewsCard from '_components/content/Newscard'
import newAPI from '../../api/News'

export default function Content() {

const [news, setNews] = useState([]);

useEffect(() => {
  getNewsFromAPI()
}, [])

function getNewsFromAPI() {
  newAPI.get('top-headlines?country=us&apiKey=b11761a9308140b7ab5f2e92c835acfa')
    .then(async function (response) {
      setNews(response.data);
  })
    .catch(function (error) {
      console.log(error)
  })
}

if (!news) {
  return null
}

return (
  <View>
    <FlatList data={news.articles}
      keyExtractor={(item, index) => 'key' + index}
      renderItem={({item}) => {
        return <NewsCard item = {item}/>
      }}
    />
  </View>
 )
}






/*export default function Content() {

  const [results, setResults] = useState([])



  useEffect(() => {
    axios
      .get("http://hn.algolia.com/api/v1/s
      ery=domesticviolence")
      .then(response => {
        console.log(response.data);
        setResults(response.data.hits);
      });
  }, []);


  return (
    <View>
      
      <Text>
      {results.map(result => (
        <li key={result.objectID}>
          <a href={result.url}>{result.title}</a>
        </li>
      </Text>
      ))}
    </View>

  );
}

const styles = StyleSheet.create({

});*/