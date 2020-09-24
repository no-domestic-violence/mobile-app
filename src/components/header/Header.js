import React from 'react';

import { View, Text, StyleSheet } from 'react-native'

export default function Header () {
  return (
    <View style ={styles.header}>
      <Text style={styles.text}>Stop Domestic Violence App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
      height: 50,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      },
    text: {
      color: '#fff',
      fontFamily: "Courier",
    }
  })