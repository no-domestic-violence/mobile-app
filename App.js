import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Header from './components/header/Header'
import HotlinesList from './components/hotlines/HotlinesList'

export default function App () {
  return (
    <View style ={styles.container}>
      <Header/>
      <HotlinesList/> 
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      flex: 1, 
    }
  })