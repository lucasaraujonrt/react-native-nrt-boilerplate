import React from 'react';
import { View } from 'react-native';

import { Home, Skia, PanGesture } from '../screens';
import { createStack } from '../services/navigation';

const MainStack = createStack();
const ContentStack = createStack();
const StartStack = createStack();

const routeList: Array<{ name: string; component: React.ReactNode }> = [
  {
    name: 'TabBar',
    component: (
      <ContentStack.Screen
        name="TabBar"
        component={() => <View />}
        key="TabBar"
      />
    ),
  },
];

const ContentNavigator = () => (
  <ContentStack.Navigator screenOptions={{ headerShown: false }}>
    {routeList.map((item) => item.component)}
  </ContentStack.Navigator>
);

const ScreensNavigator = () => (
  <StartStack.Navigator screenOptions={{ headerShown: false }}>
    <StartStack.Screen name="Home" component={Home} />
    <StartStack.Screen name="Skia" component={Skia} />
    <StartStack.Screen name="PanGesture" component={PanGesture} />
  </StartStack.Navigator>
);

const Navigator = () => (
  <MainStack.Navigator
    initialRouteName=""
    screenOptions={{ headerShown: false }}
  >
    <MainStack.Screen name="Screens" component={ScreensNavigator} />
    <MainStack.Screen name="Content" component={ContentNavigator} />
  </MainStack.Navigator>
);

export default Navigator;
