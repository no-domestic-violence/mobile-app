import { Linking } from 'react-native';

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