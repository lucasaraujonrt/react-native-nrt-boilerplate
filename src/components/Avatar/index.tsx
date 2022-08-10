import { useDimensions } from '@app/hooks';
import {
  Canvas,
  Circle,
  Group,
  Image,
  Mask,
  useImage,
} from '@shopify/react-native-skia';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

// import { Container } from './styles';

interface IAvatarProps {
  imagePath: string;
  style: StyleProp<ViewStyle>;
  mode: 'luminance' | 'alpha' | undefined;
  colorMask: string;
}

interface IMaskGroupProps {
  color: string;
}

const MaskGroup = ({ color }: IMaskGroupProps) => (
  <Group>
    <Circle cx={210} cy={210} r={128} color={color} />
  </Group>
);

const Avatar = ({
  colorMask,
  mode,
  imagePath,
  style = { flex: 1 },
}: IAvatarProps) => {
  const { width, height } = useDimensions();
  const image = useImage(require('../../assets/cart_1.png'));

  if (!image) return null;

  return (
    <Canvas style={style}>
      <Mask mode={mode} mask={<MaskGroup color={colorMask} />}>
        <Image
          {...{ image }}
          x={15}
          y={0}
          width={width * 0.5}
          height={height * 0.5}
          fit="cover"
        />
      </Mask>
    </Canvas>
  );
};

export default Avatar;
