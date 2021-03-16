import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  AuthProvider,
  LocationProvider,
  SosProvider,
  LanguageProvider,
} from 'state/';

import AppNavigation from './routes/AppNavigator';

import './services/i18n';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
});
const App = () => {
  return (
    <LanguageProvider>
      <LocationProvider>
        <AuthProvider>
          <SosProvider>
            <View style={styles.container}>
              <AppNavigation />
            </View>
          </SosProvider>
        </AuthProvider>
      </LocationProvider>
    </LanguageProvider>
  );
};

export default App;
