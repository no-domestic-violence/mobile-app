import React from 'react';
import { Text } from 'react-native-elements';
import { openExternalLink } from '../../utils';

const ExternalLinkText = ({ url, title, style }) => {
  return (
    <Text
      style={style}
      type='clear'
      onPress={() => {
        openExternalLink(url);
      }}>
      {title}
    </Text>
  );
};

export default ExternalLinkText;
