import { useTheme } from '@app/theme';
import {
  Canvas,
  useValue,
  Circle,
  useTouchHandler,
} from '@shopify/react-native-skia';
import React from 'react';

const Skia = () => {
  const cx = useValue(100);
  const cy = useValue(100);
  const {} = useTheme();

  const touchHandler = useTouchHandler({
    onActive: ({ x, y }) => {
      cx.current = x;
      cy.current = y;
    },
  });

  return (
    <Canvas style={{ flex: 1 }} onTouch={touchHandler}>
      <Circle cx={cx} cy={cy} r={100} color="red" />
    </Canvas>
  );
};

export default Skia;
