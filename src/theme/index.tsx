import {
  ThemeProvider as ReStyleThemeProvider,
  createText,
  createBox,
  useTheme as hook,
} from '@shopify/restyle';
import React, { ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const guideline = 375;
export const aspectRatio = width / guideline;

export const palette = {
  green: '#2CB9B0',
  white: 'white',
  orange: '#FE5E33',
  yellow: '#FFC641',
  pink: '#FF87A2',
  violet: '#442CB9',
  lightBlue: '#BFEAF5',
};

const theme = {
  colors: {
    primary: palette.green,
    primaryLight: '#E7F9F7',
    secondary: '#0C0D34',
    danger: '#FF0058',
    info: '#808080',
    edit: palette.lightBlue,
    text: 'rgba(12, 13, 52, 0.7)',
    textContrast: palette.white,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  fontSize: {
    s: 12,
    m: 14,
    l: 18,
    xl: 24,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'black',
    },
    subheader: {
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'black',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'black',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ReStyleThemeProvider {...{ theme }}>{children}</ReStyleThemeProvider>
);

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export const Button = createBox<Theme, RectButtonProperties>(RectButton);

export const useTheme = () => hook<Theme>();
