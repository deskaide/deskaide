import React from 'react';
import styled from 'styled-components';

import Box from './Box';

const Wrapper: React.FC = styled(Box)`
  height: 100vh;
  width: 60px;
  border-right: 2px solid ${({ theme }) => theme.colors.dark[2]};
  background-color: ${({ theme }) => theme.colors.bg0};
`;

const SidebarMenu: React.FC = () => (
  <Wrapper>
    <ul>
      <li>a</li>
      <li>b</li>
      <li>c</li>
      <li>d</li>
      <li>e</li>
      <li>f</li>
      <li>g</li>
    </ul>
    <span>
      <p>s</p>
    </span>
  </Wrapper>
);

export default SidebarMenu;
