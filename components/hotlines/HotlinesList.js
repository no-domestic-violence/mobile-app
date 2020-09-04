import React, {useState} from 'react';

import { View, Text, StyleSheet, FlatList, Linking } from 'react-native'
import ListItem from './ListItem'

export default function HotlinesList () {
    const [hotlines, setHotlines] = useState([
        {id: '1', name: 'Berlin Hotline', number: '+490306110300'},
        {id: '2', name: 'One more Hotline', number: '+490306110300'},
        {id: '3', name: 'Dummy data', number: '+490306110300'},
    ])
    const makeCall = (phoneNumber) =>{
        const iosPhoneNumber = `tel:${phoneNumber}`
        Linking.openURL(iosPhoneNumber);
    }
  return (
      <FlatList style={styles.list}
          data={hotlines}
          renderItem={({ item }) =>
              (<ListItem item={item} makeCall={makeCall}/>
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