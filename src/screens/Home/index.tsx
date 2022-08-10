import { Button } from '@app/components';
import { useTrackLocation } from '@app/hooks';
import useTranslationHook from '@app/hooks/translation';
import { navigationService } from '@app/services';
import { Text, Box } from '@app/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';

const screens = ['PanGesture', 'Skia', 'Graph'];

const Home = () => {
  const { location, startTrack, stopTrack } = useTrackLocation();
  const { i18n, t } = useTranslation();

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

          <Text textAlign="center" fontSize={50}>
            {i18n.language}
          </Text>

          <Text textAlign="center" fontSize={50} color="danger">
            {t('screens.login.title')}
          </Text>
        </Box>
      </Box>
      <Button
        label={`Change to ${i18n.language === 'en' ? 'pt_BR' : 'en'}`}
        onPress={async () =>
          i18n.changeLanguage(i18n.language === 'en' ? 'pt_BR' : 'en')
        }
        primary
      />
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
