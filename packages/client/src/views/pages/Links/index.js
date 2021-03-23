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

  useEffect(() => {
    ipcRenderer.on('LINK_LIST_UPDATED', (_, result) => {
      setLinks(formatLinkData(result.data));
    });
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
              <Text>
                <a href={link.url}>{link.title}</a>
              </Text>
              {link.image && (
                <img
                  src={link.image}
                  alt={link.title}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </li>
          ))}
        </ul>
      </Box>
    </MainAppLayout>
  );
};

export default Links;
