import React from 'react';
import { Flex, Box, MainMenu } from '../components';

const SettingsPageLayout = ({ children }) => (
  <Flex
    bg="background"
    display="flex"
    flexDirection="row"
    justifyContent="center"
    alignItem="center"
    height="100vh"
    width="100vw"
    overflow="hidden"
  >
    <Box width={72} height="100vh">
      <MainMenu />
    </Box>
    <Box width={1} overflowX="hidden" overflowY="auto">
      {children}
    </Box>
  </Flex>
);

export default SettingsPageLayout;
