import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Carousel from 'react-native-anchor-carousel';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import WatchListRenderItem from '../../components/content-views/WatchListRenderItem';
import TodayReadRenderItem from '../../components/content-views/TodayReadRenderItem';
import { videoData } from '../../mock/video';
import { Colors } from '../../styles';

// import background1 from '../../assets/backgrounds/article1.png'

const Home = ({ navigation }) => {
  // TODO: should get from db (with context api cuz of different screen)
  const background1 = require('../../assets/backgrounds/article1.png');
  const background2 = require('../../assets/backgrounds/article2.png');
  const background6 = require('../../assets/backgrounds/article6.png');
  const background9 = require('../../assets/backgrounds/article9.png');

  const [articles, setArticles] = useState([
    {
      image: background2,
      title: 'What is toxic relationship?',
      id: '1',
    },
    {
      image: background6,
      title: 'What is toxic relationship?',
      id: '2',
    },
    {
      image: background9,
      title: 'What is toxic relationship?',
      id: '3',
    },
    {
      image: background1,
      title: 'What is toxic relationship?',
      id: '4',
    },
    {
      image: background6,
      title: 'What is toxic relationship?',
      id: '5',
    },
  ]);

  const [watchList, setWatchList] = useState(videoData);

  const carouselRef = useRef(null);

  const { width } = Dimensions.get('window');

  return (
    <ScrollView style={styles.homePageView}>
      <View style={styles.searchBoxView}>
        <TextInput
          placeholder="What are u looking for?"
          placeholderTextColor="grey"
          style={styles.searchbox}></TextInput>
        <FontAwesomeIcon
          icon={faSearch}
          size={22}
          color="grey"
          style={styles.searchboxIcon}
        />
      </View>
      <Text style={styles.headers}>Today's Read</Text>
      <View style={styles.carouselContainer}>
        <Carousel
          style={styles.carousel}
          data={articles}
          renderItem={({ item }) => <TodayReadRenderItem item={item} />}
          itemWidth={200}
          containerWidth={width - 20}
          separatorWidth={0}
          ref={carouselRef}
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
          horizontal={true}
          data={watchList}
          renderItem={({ item }) => (
            <WatchListRenderItem item={item} background={background1} />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homePageView: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  headers: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 5,
  },
  rowHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchBoxView: {
    flexDirection: 'row',
    marginVertical: 20,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 4,
  },
  searchbox: {
    padding: 12,
    paddingLeft: 20,
    fontSize: 16,
  },
  searchboxIcon: {
    position: 'absolute',
    right: 20,
    top: 14,
  },
  carouselContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
    overflow: 'visible',
  },
  watchListView: {
    marginHorizontal: 14,
    marginVertical: 20,
  },
  viewMoreBtn: {
    color: '#02ad94',
    fontSize: 14,
    fontWeight: 'normal',
  },
});

export default Home;
