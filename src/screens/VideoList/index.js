import React, {useState} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {videoData} from '../../mock/video'
import VideoListRenderItem from '../../components/content-views/VideoListRenderItem';

export default function VideoList({navigation}) {
  const [watchList, setWatchList] = useState(videoData);
 const onPressItem = () => {
  navigation.navigate('Video Page')
 }
  return (
    <View>
        <FlatList
          data={watchList}
          renderItem={({ item }) => <VideoListRenderItem item={item} onPress={onPressItem}/>}
        />
        <Button
            title="Go to video"
            onPress={() =>
              navigation.navigate('Video Page')
            }
          />
    </View>
  );
}
