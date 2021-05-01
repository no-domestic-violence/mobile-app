import React from 'react';

import { WebView } from 'react-native-webview';

const VideoPage = ({ route }) => {
  const { url } = route.params.params;
  return (
    <WebView
      source={{ uri: url }}
      style={{ marginTop: 20 }}
      javaScriptEnabled
    />
  );
};

export default VideoPage;
