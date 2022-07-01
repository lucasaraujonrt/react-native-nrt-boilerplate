import React from 'react';

import { Button } from '../../components';
import { navigationService } from '../../services';
import { Text, Box } from '../../theme';

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
    <Button
      label="Skia"
      onPress={() => navigationService.navigate('Skia')}
      primary
    />
  </>
);

export default Home;
