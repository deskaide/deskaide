import React from 'react';
import { Flex, Box, MainMenu } from '../components';

const MainAppLayout = ({ appMenu, children }) => (
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
    <Box width={72} height="100vh" overflow="hidden">
      <MainMenu />
    </Box>
    <Box width={1 / 3} overflowX="hidden" overflowY="auto">
      {appMenu}
    </Box>
    <Box width={2 / 3} overflowX="hidden" overflowY="auto">
      {children}
    </Box>
  </Flex>
);

export default MainAppLayout;
