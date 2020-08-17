import React from 'react';
import { SplashScreenLayout } from '../../layouts';
import { Box } from '../../components';
import Timer from './Timer';

const Breaks = () => (
  <SplashScreenLayout>
    <Box p={4} textAlign="center">
      <Timer />
    </Box>
  </SplashScreenLayout>
);

export default Breaks;
