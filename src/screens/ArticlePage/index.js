import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity} from 'react-native';
import appApiClient from '../../api/appApiClient';
const { width, height } = Dimensions.get('window')



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
      
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <ScrollView>
      <View style={styles.cardView}>
        <Text style={styles.title}>{uniqueArticle.title}</Text>
        <Image style={styles.image} source={uniqueArticle.url_to_image ? { uri: uniqueArticle.url_to_image } : null}/>
        <Text style={styles.text}>{uniqueArticle.text}</Text>
        <Text style={styles.author}>Written by: {uniqueArticle.author}</Text>
        <Text style={styles.created_at}>Date: {uniqueArticle.created_at}</Text> 
        <Text style={styles.violence_type}>Violence Type: {uniqueArticle.violence_type}</Text>
      
      <Button title="Add to favorites"/>
      <TouchableOpacity style={styles.button} 
      onPress={() => navigation.goBack()}>
      <Text style={styles.buttonLabel}>Back to Articles</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
);
  }

  
const styles = StyleSheet.create({
  cardView: {
    backgroundColor: 'white',
    margin: width * 0.02,
    borderRadius: width * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3
},
  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#1C5C9D',
    borderRadius: 15,
    padding: 10,
    marginVertical: width * 0.02,
    marginLeft: 20,
    marginRight: 20,
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
author: {
  marginBottom: width * 0.0,
  marginHorizontal: width * 0.05,
  fontSize: 12,
  color: 'black',
  marginLeft: width * 0.05,
},
title: {
  marginHorizontal: width * 0.05,
  marginVertical: width * 0.05,
  color: 'black',
  fontSize: 20,
  fontWeight: 'bold',
  marginLeft: width * 0.05,

},
image: {
  height: height / 4,
  marginLeft: width * 0.05,
  marginRight: width * 0.05,
  marginVertical: height * 0.02
},
created_at: {
  marginHorizontal: width * 0.5,
  marginBottom: 5,
  fontSize: 12,
  color: 'black',
  textAlign: 'left',
  marginLeft: 20,
  marginRight: 20,
  marginTop: 10,
},
violence_type: {
  marginHorizontal: width * 0.05,
  fontSize: 12,
  color: 'black',
  textAlign: 'left',
  marginLeft: 20,
  marginRight: 20,
  marginTop: 6,
  marginBottom: 20,
},
})
   
  
