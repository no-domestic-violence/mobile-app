import React from 'react';

import { WebView } from 'react-native-webview';

export default function VideoPage({ route }) {
  const { url } = route.params.params;
  return (
    <WebView
      source={{ uri: url }}
      style={{ marginTop: 20 }}
      javaScriptEnabled
    />
  );
}

// TODO : to reuse this for own video
/*   
import { View } from 'react-native';
import { Video } from 'expo-av';

<View>
      <Video
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        useNativeControls
        shouldPlay
        style={{ width: '100%', height: '70%' }}
        resizeMode="contain"
      />
    </View>

  */
