import React from 'react';
import { View } from 'react-native';
import { Colors } from '_styles/index';
import { Divider, Text } from 'react-native-elements';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyledHotlinesListItem } from 'styles/shared';
import ExternalLinkText from 'components/external-link-text';
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
            <View>
              <ExternalLinkText
                style={styles.listItemWebsite}
                url={item.website}
                title={item.website}
              />
              <Text>{item.description}</Text>
            </View>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon
            testID='makeCall'
            onPress={() => makeCall(item.phone)}
            icon={faPhone}
            size={25}
            color='#000'
          />
        </View>
      </StyledHotlinesListItem>
      <Divider style={{ height: 20, backgroundColor: Colors.primary }} />
    </>
  );
}
