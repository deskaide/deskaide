import React from 'react';
import { SplashScreenLayout } from '../../layouts';
import { Box, Text } from '../../components';

const electron = window.require('electron');
const { ipcRenderer, remote } = electron;

const closeWindow = () => {
  const currentWindow = remote.getCurrentWindow();
  currentWindow.close();
};

const Breaks = () => (
  <SplashScreenLayout>
    <Box p={4}>
      <Text variant="h1">This is a break window</Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam nam,
        aperiam fugit ea consequuntur unde, iste aliquid expedita aut eligendi
        laboriosam, et obcaecati, distinctio. Mollitia unde, amet voluptatum
        tempore voluptatibus?
      </Text>
      <button
        onClick={() => {
          closeWindow();
        }}
      >
        Close
      </button>
    </Box>
  </SplashScreenLayout>
);

export default Breaks;
