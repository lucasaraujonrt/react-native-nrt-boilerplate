import { Dimensions, Platform, PixelRatio } from 'react-native';

export const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  fontScale: SCREEN_FONT,
} = Dimensions.get('window');

const wscale: number = SCREEN_WIDTH / 375;
const hscale: number = SCREEN_HEIGHT / 667;

const guidelineBaseWidth = 350;

const Responsive = {
  widthScale: (percentage: number) => SCREEN_WIDTH * percentage,
  heightScale: (percentage: number) => SCREEN_HEIGHT * percentage,
  fontScale: (size: number) => size * (SCREEN_WIDTH / guidelineBaseWidth),
  normalize:
    () =>
    (size: number, based: 'width' | 'height' = 'width') => {
      const newSize = based === 'height' ? size * hscale : size * wscale;
      if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
      }

      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    },
};

export default Responsive;
