import { Button } from '@app/components';
import { useTrackLocation } from '@app/hooks';
import { navigationService } from '@app/services';
import { Text, Box } from '@app/theme';
import React from 'react';

const screens = ['PanGesture', 'Skia'];

const Home = () => {
  const { location, startTrack, stopTrack } = useTrackLocation(500);

  return (
    <>
      <Box flex={1}>
        <Box
          width="100%"
          alignSelf="center"
          justifyContent="center"
          alignItems="center"
          height={200}
        >
          <Text fontSize={40} textAlign="center">
            Welcome!
          </Text>
          <Text fontWeight="700" textAlign="center">
            Latitude: {location.lat}
          </Text>
          <Text textAlign="center">Longitude: {location.long}</Text>
        </Box>
      </Box>
      <Button
        label={location.lat === 0 ? 'Start' : 'Stop'}
        onPress={() => (location.lat === 0 ? startTrack() : stopTrack())}
        primary
      />
      {screens.map((screen) => (
        <Button
          label={screen}
          onPress={() => navigationService.navigate(screen)}
          primary
        />
      ))}
    </>
  );
};

export default Home;
