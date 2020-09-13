import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export default function NavigationItem ({item}) {
  return (
    <TouchableOpacity style ={styles.navItem}>
        <View style ={styles.navItemView}>
            <Text style={styles.navItemText}>{item.name}  {item.number}</Text>
            <FontAwesomeIcon icon={ item.icon } style ={styles.navIcon} />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
   navItem: {
       padding: 25,
       borderColor: 'grey',
   },
   navItemView: {
       flexDirection: 'row',
   },
   navItemText: {
    color: "#fff",
},
   navIcon: {
       color: "#fff",
   }
  })