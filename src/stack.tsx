import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigator from './routes';
import { navigationRef } from './services/navigation';

const AppContent = () => (
  <SafeAreaProvider>
    <NavigationContainer ref={navigationRef}>
      <Navigator />
    </NavigationContainer>
  </SafeAreaProvider>
);

export default AppContent;
