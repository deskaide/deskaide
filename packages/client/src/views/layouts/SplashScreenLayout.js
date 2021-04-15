import React from 'react';
import { Flex } from '../components';

const SplashScreenLayout = ({ children }) => (
  <Flex
    bg="background"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItem="center"
    minHeight="100vh"
    minWidth="100vw"
  >
    {children}
  </Flex>
);

export default SplashScreenLayout;
