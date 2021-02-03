import { StyleSheet } from 'react-native';
import { Colors } from 'styles';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 0,
    borderRadius: 14,
    color: '#000',
    fontWeight: '500',
    fontSize: 20,
    overflow: 'hidden',
    textAlign: 'center',
    width: '40%',
    marginLeft: 10,
  },
  userSettingsContainer: {
    alignItems: 'flex-start',
  },
  userSettingsActions: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 40,
  },
  userSettingsActionsView: {
    marginVertical: 50,
    marginLeft: 10,
  },
});
