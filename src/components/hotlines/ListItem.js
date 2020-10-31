import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

export default function ListItem ({item, makeCall}) {
  return (
    <TouchableOpacity style ={styles.listItem}>
        <View style ={styles.listItemView}>
            <Text style={styles.listItemText}> {item.city}, {item.organisation_name}, tel:{item.phone}</Text>
            <FontAwesomeIcon icon={ faPhone } onPress ={()=>makeCall(item.phone)} />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
   listItem: {
       padding: 15,
       borderColor: 'grey',
       borderBottomWidth: 1,
   },
   listItemView: {
       flexDirection: 'row',
       justifyContent: 'space-between'
   }
  })