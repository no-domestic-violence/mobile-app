import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';
// import Header from './components/header/Header';
// import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './routes/AppNavigator';
import {ContextProvider} from './state';
import './services/i18n';

export default function App() {
  return (
    <ContextProvider>
      <View style={styles.container}>
        <AppNavigation />
      </View>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
});
