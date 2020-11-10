import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Icon } from "react-native-elements";
export default function ListItem({ item, makeCall }) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.info}>
        <Avatar
          size="medium"
          icon={{ name: 'info-circle', color: 'grey', type: 'font-awesome' }}
          activeOpacity={0.7}
          onPress={toggleOverlay}
        />
        <View style={styles.listItemContent}>
          <Text style={styles.listItemTitle}>{item.organisation_name}</Text>
          <Text style={styles.listItemContacts} >
            {item.city}, tel:{item.phone}
          </Text>
        </View>
      </View>

      <View>
        <Icon
          raised
          name="phone"
          type="font-awesome"
          color="pink"
          onPress={() => makeCall(item.phone)}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',

  },
  listItem: {
    paddingVertical: 10,
    paddingHorizontal: 2,
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
  listItemContacts: {
    flexWrap: 'wrap',
    flexShrink: 1,
    
    // flex: 1
  },
  listItemContent:{
    flexWrap: 'wrap',
    flex: 1
  }
});
