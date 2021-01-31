import { StyleSheet } from 'react-native';
import { Window } from 'styles/index';

export const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    alignSelf: 'center',
    marginTop: 40,
  },
  tcContainer: {
    marginTop: 30,
    width: Window.width * 0.85,
    height: Window.height * 0.7,
    backgroundColor: 'rgba(255, 255, 255, 0.71)',
    borderRadius: 31,
  },

  button: {
    marginBottom: 40,
  },

  buttonDisabled: {
    backgroundColor: '#999',
    marginBottom: 40,
  },
});
