import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  userSettingsContainer: {
    alignItems: 'flex-start',
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  arrow: {
    alignSelf: 'flex-start',
    marginTop: 50,
    marginLeft: 10,
  },
  textError: {
    marginTop: 20,
    color: 'darkred',
  },
  textSuccess: {
    color: 'darkgreen',
  },
  modalContainer: {
    backgroundColor: '#f9fafb',
    width: '80%',
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
