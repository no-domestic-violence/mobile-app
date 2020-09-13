import React from 'react';

import { View, StyleSheet, FlatList } from 'react-native'
import NavigationItem from './NavigationItem'
import { faPhone, faHome, faBook } from '@fortawesome/free-solid-svg-icons'

export default function Navigation() {
  const navigation =[
    {id: '1', name: 'Home', icon: faHome},
    {id: '2', name: 'Hotlines', icon: faPhone},
    {id: '3', name: 'Content', icon: faBook},
  ]

  return (
    <View style={styles.navList}>
        <FlatList
        numColumns={3}
        columnWrapperStyle={styles.row}
        data={navigation}
        renderItem={({item}) => <NavigationItem item={item} />}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    navList: {
        height: 70,
        backgroundColor: '#000',
        alignItems: 'center',
      },
      row: {
        flex: 1,
        justifyContent: 'space-between',
      },
  })