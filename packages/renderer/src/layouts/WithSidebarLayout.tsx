import React from 'react';

import { Box, Text } from '../components';

// const Wrapper = styled(Box)`
//   width: 100%;
//   height: 100vh;
// `;

const WithSidebarLayout: React.FC<{
  sidebar: React.ReactNode;
  sidebarTitle?: string;
  children: React.ReactNode;
}> = ({ children, sidebar, sidebarTitle }) => {
  return (
    <Box display="flex">
      <Box width={1 / 3} borderRight="2px solid var(--color-dark-2)">
        {sidebarTitle && (
          <Box
            textAlign="center"
            height={66}
            borderBottom="2px solid var(--color-dark-2)"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text variant="h5">{sidebarTitle}</Text>
          </Box>
        )}
        <Box overflowY="auto" height="calc(100vh - 66px)">
          {sidebar}
        </Box>
      </Box>
      <Box width={2 / 3} overflowY="auto" height="100vh">
        {children}
      </Box>
    </Box>
  );
};

export default WithSidebarLayout;
