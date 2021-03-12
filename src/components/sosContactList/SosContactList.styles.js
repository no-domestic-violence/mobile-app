import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactContainer: {
    height: '25%',
    width: '75%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contactText: {
    color: '#000000',
    marginLeft: 10,
    fontWeight: '600',
  },
  contactPlaceholder: {
    color: '#000000',
    opacity: 0.34,
    marginLeft: 10,
    fontWeight: '400',
    fontSize: 16,
  },
  messageButtonContainer: {
    marginTop: 100,
    height: '10%',
    borderRadius: 41,
    backgroundColor: '#D65137',
    justifyContent: 'center',
  },
  messageButtonText: {
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    left: 10,
    fontSize: 14,
    paddingRight: 15,
  },
  buttonText: {
    backgroundColor: '#FEF8E3',
    padding: 18,
    borderRadius: 41,
  },
});
