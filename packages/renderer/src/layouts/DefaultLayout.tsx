import * as React from 'react';
import styled from 'styled-components';

import { Box, SidebarMenu } from '../components';

const Wrapper = styled(Box)`
  width: 100%;
  height: 100vh;
`;

export const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box display="flex" overflow="hidden">
      <SidebarMenu />
      <Wrapper>{children}</Wrapper>
    </Box>
  );
};
