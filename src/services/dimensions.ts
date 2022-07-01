import { Dimensions, Platform, PixelRatio } from 'react-native';

export const winWidth = Dimensions.get('window').width;
export const winHeight = Dimensions.get('window').height;
export const winFont = Dimensions.get('window').fontScale;
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

const wscale: number = SCREEN_WIDTH / 375;
const hscale: number = SCREEN_HEIGHT / 667;

const guidelineBaseWidth = 350;

const Responsive = {
  widthScale: (percentage: number) => winWidth * percentage,
  heightScale: (percentage: number) => winHeight * percentage,
  fontScale: (size: number) => size * (winWidth / guidelineBaseWidth),
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
