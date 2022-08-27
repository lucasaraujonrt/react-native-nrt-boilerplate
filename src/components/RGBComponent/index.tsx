import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

interface IRGBComponentProps {
  onSelectColor: (color: string) => void;
}

/**
 * @param length
 * @param maxLength
 */
const RainBowColor = (length: number, maxLength: number) => {
  const i = (length * 255) / maxLength;
  const r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
  const g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
  const b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);

  return `rgb(${r},${g},${b})`;
};

const allColors = [...Array(60).keys()];

const RGBComponent = ({ onSelectColor }: IRGBComponentProps) => (
  <ScrollView
    horizontal
    style={{ flexDirection: 'row', flexGrow: 0.1 }}
    showsHorizontalScrollIndicator={false}
  >
    {allColors.map((_, index) => (
      <TouchableOpacity
        onPress={() => onSelectColor(RainBowColor(index, 60))}
        style={{
          width: 40,
          height: 40,
          marginHorizontal: 10,
          borderRadius: 20,
          backgroundColor: RainBowColor(index, 60),
        }}
      />
    ))}
  </ScrollView>
);

export default RGBComponent;
