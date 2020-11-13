import React from 'react';
import {View, Text, Button} from 'react-native';




export default function VideoList({navigation}) {
  return (
    <View>
        <Text>Here is the different content</Text>
        <Button
            title="Go to video"
            onPress={() =>
              navigation.navigate('Video Page')
            }
          />
    </View>
  );
}
