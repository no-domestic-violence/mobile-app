import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../styles/index';
import {
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function ListItem({ item, makeCall }) {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.info}>
        <View style={styles.listItemContent}>
          <Text style={styles.listItemTitle}>{item.organisation_name}</Text>
          <Text style={styles.listItemContacts}>
            {item.city}, tel:{item.phone}
          </Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <FontAwesomeIcon
          onPress={() => makeCall(item.phone)}
          icon={faPhone}
          size={25}
          color={'#000'}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  info: {
    alignContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.secondary,
    margin: 20,
    borderRadius: 30,
  },
  listItemTitle: {
    fontWeight: 'bold',
    flexShrink: 1,
  },
  listItemContacts: {
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  listItemContent: {
    flexWrap: 'wrap',
    flex: 1,
  },
});
