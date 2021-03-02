import React, { useEffect, useState } from 'react';
import { MainAppLayout } from '../../layouts';
import { Box, Text } from '../../components';
import LinkOptions from './LinkOptions';
import formatLinkData from '../../../utils/formatter';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const Links = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const result = ipcRenderer.sendSync('FETCH_ALL', { type: 'links' });
    setLinks(formatLinkData(result.data));
  }, []);

  return (
    <MainAppLayout appMenu={<LinkOptions />}>
      <Box p={4}>
        <Text variant="h1">{`Total links: ${links.length}`}</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam nam,
          aperiam fugit ea consequuntur unde, iste aliquid expedita aut eligendi
          laboriosam, et obcaecati, distinctio. Mollitia unde, amet voluptatum
          tempore voluptatibus?
        </Text>
        <ul>
          {links.map((link) => (
            <li key={link.createdAt}>
              <Text>{link.url}</Text>
            </li>
          ))}
        </ul>
      </Box>
    </MainAppLayout>
  );
};

export default Links;
