import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Carousel from 'react-native-anchor-carousel';
import { Feather } from '@expo/vector-icons';
import WatchListRenderItem from '../../components/content-views/WatchListRenderItem';
import TodayReadRenderItem from '../../components/content-views/TodayReadRenderItem';

const Home = ({ navigation }) => {

  // TODO: should get from db (with context api cuz of different screen)
  const [articles, setArticles] = useState([
    {
      image:
        'https://lh3.googleusercontent.com/proxy/RcW5IGnNMa1UlfTQyblDnJ4v6CKl7ggjmUecuwzRh1KVGfO1UVzGIf_Evvc5Jdw94GliaORNTQKn7xyswJk1ESZoI2kHJzets9F8m2wPYykBGEEm6nr-Wgfm3QjE6TCWkn8dYNLB2JII',
      title: 'What is toxic relationship?',
      id: '1',
    },
    {
      image:
        'https://lh3.googleusercontent.com/proxy/RcW5IGnNMa1UlfTQyblDnJ4v6CKl7ggjmUecuwzRh1KVGfO1UVzGIf_Evvc5Jdw94GliaORNTQKn7xyswJk1ESZoI2kHJzets9F8m2wPYykBGEEm6nr-Wgfm3QjE6TCWkn8dYNLB2JII',
      title: 'What is toxic relationship?',
      id: '2',
    },
    {
      image:
        'https://lh3.googleusercontent.com/proxy/RcW5IGnNMa1UlfTQyblDnJ4v6CKl7ggjmUecuwzRh1KVGfO1UVzGIf_Evvc5Jdw94GliaORNTQKn7xyswJk1ESZoI2kHJzets9F8m2wPYykBGEEm6nr-Wgfm3QjE6TCWkn8dYNLB2JII',
      title: 'What is toxic relationship?',
      id: '3',
    },
    {
      image:
        'https://lh3.googleusercontent.com/proxy/RcW5IGnNMa1UlfTQyblDnJ4v6CKl7ggjmUecuwzRh1KVGfO1UVzGIf_Evvc5Jdw94GliaORNTQKn7xyswJk1ESZoI2kHJzets9F8m2wPYykBGEEm6nr-Wgfm3QjE6TCWkn8dYNLB2JII',
      title: 'What is toxic relationship?',
      id: '4',
    },
    {
      image:
        'https://lh3.googleusercontent.com/proxy/RcW5IGnNMa1UlfTQyblDnJ4v6CKl7ggjmUecuwzRh1KVGfO1UVzGIf_Evvc5Jdw94GliaORNTQKn7xyswJk1ESZoI2kHJzets9F8m2wPYykBGEEm6nr-Wgfm3QjE6TCWkn8dYNLB2JII',
      title: 'What is toxic relationship?',
      id: '5',
    },
  ]);

  // TODO: should get from db (with context api cuz of different screen)
  const [watchList, setWatchList] = useState([
    {
      image:
        'https://freedesignfile.com/upload/2017/03/Cute-easter-seamless-pattern-design-vector-12.jpg',
      id: '1',
    },
    {
      image:
        'https://freedesignfile.com/upload/2017/03/Cute-easter-seamless-pattern-design-vector-12.jpg',
      id: '2',
    },
    {
      image:
        'https://freedesignfile.com/upload/2017/03/Cute-easter-seamless-pattern-design-vector-12.jpg',
      id: '3',
    },
    {
      image:
        'https://freedesignfile.com/upload/2017/03/Cute-easter-seamless-pattern-design-vector-12.jpg',
      id: '4',
    },
    {
      image:
        'https://freedesignfile.com/upload/2017/03/Cute-easter-seamless-pattern-design-vector-12.jpg',
      id: '5',
    },
  ]);

  const carouselRef = useRef(null);

  const { width } = Dimensions.get('window');

  return (
    <ScrollView style={styles.homePageView}>
      <View style={styles.searchBoxView}>
        <TextInput
          placeholder="What are u looking for?"
          placeholderTextColor="grey"
          style={styles.searchbox}></TextInput>
        <Feather
          name="search"
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
          horizontal={true}
          data={watchList}
          renderItem={({ item }) => <WatchListRenderItem item={item} />}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homePageView: {
    backgroundColor: '#CADEEE',
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
