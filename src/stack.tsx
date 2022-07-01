import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Navigator from './routes';
import { navigationRef } from './services/navigation';
import { useTheme } from './theme';

const AppContent = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}> */}
      <NavigationContainer ref={navigationRef}>
        <Navigator />
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  );
};

export default AppContent;
