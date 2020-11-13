import React from 'react';
import { View } from 'react-native';
import { Video } from 'expo-av';

export default function VideoPage() {
  return (
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
  );
}