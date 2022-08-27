import RGBComponent from '@app/components/RGBComponent';
import { Text } from '@app/theme';
import {
  Canvas,
  Path,
  Skia,
  useTouchHandler,
  useValue,
} from '@shopify/react-native-skia';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const Draw = () => {
  const cx = useValue(100);
  const cy = useValue(100);
  const path = useValue(Skia.Path.Make());
  const pathColor = useValue('red');

  const touchHandler = useTouchHandler({
    onStart: ({ x, y }) => {
      cx.current = x;
      cy.current = y;
      path.current.moveTo(x, y);
    },
    onActive: ({ x, y }) => {
      cx.current = x;
      cy.current = y;

      path.current.lineTo(x, y);
    },
    onEnd: ({ x, y }) => {
      cx.current = x;
      cy.current = y;
    },
  });

  const onClearComponent = () => {
    path.current = Skia.Path.Make();
  };

  const onSelectColor = (color: string) => {
    pathColor.current = color;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#2F2F36' }}>
      <Canvas
        style={{ flex: 1, backgroundColor: '#2F2F36' }}
        onTouch={touchHandler}
      >
        <Path path={path} color={pathColor} strokeWidth={4} style="stroke" />
      </Canvas>
      <TouchableOpacity onPress={onClearComponent}>
        <Text fontSize={30} textAlign="center" style={{ color: 'white' }}>
          Clean
        </Text>
      </TouchableOpacity>
      <RGBComponent {...{ onSelectColor }} />
    </View>
  );
};

export default Draw;
