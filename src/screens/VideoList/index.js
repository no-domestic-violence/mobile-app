import React from 'react';
import { View, FlatList } from 'react-native';
import { VideoListRenderItem } from '_components/content-views/';
import videoData from '../../mock/video';

export default function VideoList({ navigation }) {
  const watchList = videoData;
  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={watchList}
        renderItem={({ item }) => (
          <VideoListRenderItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}
