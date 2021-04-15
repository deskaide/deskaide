import React, { useEffect, useState } from 'react';
import { MainAppLayout } from '../../layouts';
import { Box, Text, LinkCard } from '../../components';
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
        <Box display="flex" flexWrap="wrap" mx={[0, -2]}>
          {links.map((link, i) => (
            <Box width={[1 / 2]} p={3} key={i}>
              <LinkCard {...link} />
            </Box>
          ))}
        </Box>
      </Box>
    </MainAppLayout>
  );
};

export default Links;
