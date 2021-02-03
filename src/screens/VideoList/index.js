import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import videoData from '../../mock/video';
import VideoListRenderItem from '../../components/content-views/VideoListRenderItem';

export default function VideoList({ navigation }) {
  const [watchList, setWatchList] = useState(videoData);
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
