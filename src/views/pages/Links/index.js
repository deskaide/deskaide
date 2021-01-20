import React from 'react';
import { MainAppLayout } from '../../layouts';
import { Box, Text } from '../../components';
import LinkOptions from './LinkOptions';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const Links = () => (
  <MainAppLayout appMenu={<LinkOptions />}>
    <Box p={4}>
      <Text variant="h1">This is link window</Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam nam,
        aperiam fugit ea consequuntur unde, iste aliquid expedita aut eligendi
        laboriosam, et obcaecati, distinctio. Mollitia unde, amet voluptatum
        tempore voluptatibus?
      </Text>
      <button
        type="button"
        onClick={() => {
          ipcRenderer.send('SHOW_BREAK_PAGE');
        }}
      >
        Break
      </button>
    </Box>
  </MainAppLayout>
);

export default Links;