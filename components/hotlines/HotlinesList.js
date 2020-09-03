import React, {useState} from 'react';

import { View, Text, StyleSheet, FlatList } from 'react-native'

export default function HotlinesList () {
    const [hotlines, setHotlines] = useState([
        {id: '1', name: 'Berlin Hotline', number: '+49 (0) 30 - 611 03 00'},
        {id: '2', name: 'One more Hotline', number: '+49 (0) 30 - 611 03 00'},
        {id: '3', name: 'Dummy data Hotline', number: '+49 (0) 30 - 611 03 00'},
    ])
  return (
      <FlatList style={styles.list}
          data={hotlines}
          renderItem={({ item }) =>
              (<Text style={styles.text}>{item.name}- {item.number}</Text>
              )} />
  )
}

const styles = StyleSheet.create({
    list: {
      flex: 1, 
      paddingTop: 100,
      color: 'black'
      },
    text: {
      color: 'black',
      fontFamily: "Courier",
    }
  })