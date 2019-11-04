import React from 'react';
import { SplashScreenLayout } from '../../layouts';
import { Box, Image, Text } from '../../components';
import SplashScreenMenu from './SplashScreenMenu';
import logo from '../../../assets/images/logo.svg';

const SplashScreen = () => {
  return (
    <SplashScreenLayout>
      <Box color="text" textAlign="center">
        <Image src={logo} height="12vmin" />
        <Text variant="h2">Desk Stat</Text>
        <Text variant="h5" fontWeight="400">
          Check your desk stat!
        </Text>
      </Box>
      <Box color="text" textAlign="center" margin="0 auto" mt={5}>
        <SplashScreenMenu />
      </Box>
    </SplashScreenLayout>
  );
};

export default SplashScreen;
