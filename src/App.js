import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigation from './routes/AppNavigator';
import { Provider as AuthProvider } from './state/AuthContext';
import { LanguageProvider } from './state/LanguageContext';

import './services/i18n';

const App = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <View style={styles.container}>
          <AppNavigation />
        </View>
      </AuthProvider>
    </LanguageProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
});

export default App;
