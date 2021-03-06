import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-anchor-carousel';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  WatchListRenderItem,
  TodayReadRenderItem,
} from '_components/content-views/';
import videoData from '../../mock/video';
import { styles } from './Home.styles';

const Home = ({ navigation }) => {
  // TODO: should get from db (with context api cuz of different screen)
  // eslint-disable-next-line
  const background1 = require('../../assets/backgrounds/article1.png');
  // eslint-disable-next-line
  const background2 = require('../../assets/backgrounds/article2.png');
  // eslint-disable-next-line
  const background6 = require('../../assets/backgrounds/article6.png');
  // eslint-disable-next-line
  const background9 = require('../../assets/backgrounds/article9.png');

  const articles = [
    {
      image: background2,
      title: 'Why do we have violence?',
      id: '1',
    },
    {
      image: background6,
      title: 'Sexual violence in teenagers',
      id: '2',
    },
    {
      image: background9,
      title: 'Financial violence in life',
      id: '3',
    },
    {
      image: background1,
      title: 'Digital violence in social media',
      id: '4',
    },
    {
      image: background6,
      title: 'Physical violence is increasing in Germany',
      id: '5',
    },
  ];

  const watchList = videoData;

  const { width } = Dimensions.get('window');

  return (
    <ScrollView style={styles.homePageView} scrollEventThrottle={16}>
      <View style={styles.searchBoxView}>
        <TextInput
          placeholder='What are u looking for?'
          placeholderTextColor='grey'
          style={styles.searchbox}
        />
        <FontAwesomeIcon
          icon={faSearch}
          size={22}
          color='grey'
          style={styles.searchboxIcon}
        />
      </View>
      <Text style={styles.headers}>Today&#39;s Read</Text>
      <View style={styles.carouselContainer}>
        <Carousel
          style={styles.carousel}
          data={articles}
          renderItem={({ item }) => (
            <TodayReadRenderItem item={item} navigation={navigation} />
          )}
          itemWidth={200}
          containerWidth={width - 20}
          separatorWidth={0}
          // ref={carouselRef}
          inActiveOpacity={0.7}
        />
      </View>
      <View style={styles.watchListView}>
        <View style={styles.rowHeaders}>
          <Text style={styles.headers}>Watch List</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Video List')}>
            <Text style={styles.viewMoreBtn}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          horizontal
          data={watchList}
          renderItem={({ item }) => (
            <WatchListRenderItem item={item} background={background1} />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
