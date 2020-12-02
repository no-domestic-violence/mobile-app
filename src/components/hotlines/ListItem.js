import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../styles/index';
import { Divider } from 'react-native-elements';

import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyledHotlinesListItem } from '_styles/shared';

export default function ListItem({ item, makeCall }) {
  return (
    <>
      <StyledHotlinesListItem>
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
      </StyledHotlinesListItem>
      <Divider style={{ height: 20, backgroundColor: Colors.primary }} />
    </>
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
