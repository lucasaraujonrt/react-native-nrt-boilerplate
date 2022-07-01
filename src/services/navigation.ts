import {
  CommonActions,
  NavigationState,
  PartialState,
  StackActions,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

export const navigationRef: any = React.createRef();

const navigationService = {
  back: () => {
    if (navigationRef.current) {
      navigationRef.current.goBack();
    }
  },
  navigate: (routeName: string, params: any = {}) => {
    if (navigationRef.current) {
      navigationRef.current.navigate(routeName, params);
    }
  },

  popToTop: (routeName: string, params?: any, firstScreen?: string) => {
    if (navigationRef.current) {
      const routes = params
        ? [{ name: routeName, params }]
        : [{ name: routeName }];

      if (firstScreen && firstScreen.length > 0) {
        navigationRef.current.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: firstScreen }, ...routes],
          })
        );
      } else {
        navigationRef.current.dispatch(
          CommonActions.reset({
            index: 1,
            routes,
          })
        );
      }
    }
  },

  replace: (routeName: string, params: any = {}) => {
    if (navigationRef.current) {
      navigationRef.current.dispatch(StackActions.replace(routeName, params));
    }
  },
  reset: (state: PartialState<NavigationState>) => {
    if (navigationRef.current) {
      navigationRef.current.dispatch(CommonActions.reset(state));
    }
  },
};

export const createStack = createStackNavigator;

export default navigationService;
