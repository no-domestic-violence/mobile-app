import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

export default function ListItem({ item, makeCall }) {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View>
        <Text style={styles.listItemTitle}>{item.organisation_name}</Text>
        <Text style={styles.listItemContacts}>
          {item.city}, tel:{item.phone}
        </Text>
      </View>
      <View>
        <FontAwesomeIcon icon={faPhone} onPress={() => makeCall(item.phone)} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderColor: 'grey',
    borderBottomWidth: 1,
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemTitle: {
    fontWeight: 'bold',
    flexShrink: 1,
  },
});
