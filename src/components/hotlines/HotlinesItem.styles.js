import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
