import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';
// import Header from './components/header/Header';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './routes/TabNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
});
