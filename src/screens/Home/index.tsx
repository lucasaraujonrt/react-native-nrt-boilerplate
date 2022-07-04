import { Button } from '@app/components';
import { navigationService } from '@app/services';
import { Text, Box } from '@app/theme';
import React from 'react';

const screens = ['PanGesture', 'Skia'];

const Home = () => (
  <>
    <Box flex={1}>
      <Box
        width="100%"
        alignSelf="center"
        justifyContent="center"
        alignItems="center"
        height={200}
      >
        <Text textAlign="center">Welcome!</Text>
      </Box>
    </Box>
    {screens.map((screen) => (
      <Button
        label={screen}
        onPress={() => navigationService.navigate(screen)}
        primary
      />
    ))}
  </>
);

export default Home;
