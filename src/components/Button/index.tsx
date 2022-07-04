import { Button as ThemedButton, Text, useTheme } from '@app/theme';
import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

interface ButtonProps {
  label: string;
  primary?: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    textAlign: 'center',
  },
});

const Button = ({ label, primary, onPress }: ButtonProps) => {
  const color = primary ? 'white' : undefined;
  const { colors } = useTheme();
  const backgroundColor = primary ? colors.danger : undefined;

  return (
    <ThemedButton activeOpacity={0.7} {...{ onPress }} borderRadius="xl">
      <SafeAreaView style={{ backgroundColor }} accessible>
        <View style={styles.container}>
          <Text style={[styles.label, { color }]}>{label}</Text>
        </View>
      </SafeAreaView>
    </ThemedButton>
  );
};

export default Button;
