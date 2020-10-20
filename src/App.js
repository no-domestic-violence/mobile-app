import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet } from 'react-native';
// import Header from './components/header/Header';
// import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './routes/AppNavigator';
import { Provider as AuthProvider } from './state/AuthContext';

import './services/i18n';

export default App = () => {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <AppNavigation />
      </View>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
});
