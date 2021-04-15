import React from 'react';
import { withTheme } from 'styled-components';
import { SplashScreenLayout } from '../../layouts';
import { Box, Image, Text } from '../../components';
import SplashScreenMenu from './SplashScreenMenu';

import logoLight from '../../../assets/images/logo-light.svg';
import logoDark from '../../../assets/images/logo-dark.svg';

const SplashScreen = ({ theme }) => (
  <SplashScreenLayout>
    <Box color="text" textAlign="center">
      <Image
        src={theme.name === 'light' ? logoDark : logoLight}
        height="12vmin"
      />
      <Text variant="h2">Desk Aide</Text>
      <Text variant="h5" fontWeight="400">
        An aide to your desk life!
      </Text>
    </Box>
    <Box color="text" textAlign="center" margin="0 auto" mt={5}>
      <SplashScreenMenu />
    </Box>
  </SplashScreenLayout>
);

export default withTheme(SplashScreen);
