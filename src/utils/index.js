import { Linking } from 'react-native';

export const openExternalLink = (url) => {
  return Linking.openURL(url).catch((err) => {
    console.error('There is an errror: ', err);
    // TODO: do modal
  });
};

export const makeCall = (phoneNumber) => {
  const iosPhoneNumber = `tel:${phoneNumber}`;
  Linking.openURL(iosPhoneNumber);
};
