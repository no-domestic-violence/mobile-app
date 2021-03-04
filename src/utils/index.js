import { Linking } from 'react-native';

export const openExternalLink = (props) => {
  return Linking.openURL(props.url).catch((err) => {
    console.error('Failed opening page because: ', err);
    //TODO: change to modal
    alert('Failed to open page');
  });
};
