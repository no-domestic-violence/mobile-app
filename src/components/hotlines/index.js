import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Colors } from '_styles/index';
import { Divider } from 'react-native-elements';

import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyledHotlinesListItem } from '_styles/shared';
import { styles } from './HotlinesItem.styles';
export default function HotlinesItem({ item, makeCall }) {
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

HotlinesItem.propTypes = {
  item: PropTypes.object.isRequired,
  makeCall: PropTypes.func,
};
