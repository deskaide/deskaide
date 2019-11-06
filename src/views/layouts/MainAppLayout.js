import React from 'react';
import { Flex, Box, MainMenu } from '../components';

const MainAppLayout = ({ appMenu, children }) => (
  <Flex
    bg="background"
    display="flex"
    flexDirection="row"
    justifyContent="center"
    alignItem="center"
    minHeight="100vh"
    minWidth="100vw"
  >
    <Box width={72} height="100vh">
      <MainMenu />
    </Box>
    <Box width={1 / 3}>{appMenu}</Box>
    <Box width={2 / 3}>{children}</Box>
  </Flex>
);

export default MainAppLayout;
