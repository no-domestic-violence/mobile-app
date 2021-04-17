import { Linking } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export const openExternalLink = (url) => {
  return Linking.openURL(url).catch((err) => {
    console.error('There is an errror: ', err);
    // TODO: change to modal
    alert('Failed to open page');
  });
};

export const makeCall = (phoneNumber) => {
  const iosPhoneNumber = `tel:${phoneNumber}`;
  Linking.openURL(iosPhoneNumber);
};

export const getUsernameTokenFromStore = async () => {
  const username = await SecureStore.getItemAsync('username');
  const token = await SecureStore.getItemAsync('token');
  return { username, token };
};
