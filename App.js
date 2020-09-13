import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from './components/header/Header';
import {NavigationContainer} from '@react-navigation/native';
import {HomeNavigator} from './routes/HomeNavigator';

import HotlinesList from './components/hotlines/HotlinesList';
import Menu from './components/menu/Menu';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <NavigationContainer>
        <HomeNavigator />
      </NavigationContainer>
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
});
