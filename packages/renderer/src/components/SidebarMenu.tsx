import React from 'react';
import styled, { useTheme } from 'styled-components';

import Box from './Box';
import Logo from './Logo';

const Wrapper: React.FC = styled(Box)`
  height: 100vh;

  border-right: 2px solid ${({ theme }) => theme.colors.dark[2]};
  background-color: ${({ theme }) => theme.colors.bg0};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;

  ul {
    list-style: none;

    li {
      padding: 16px;
      border-bottom: 2px solid ${({ theme }) => theme.colors.dark[2]};
      display: flex;

      &::before {
        content: '';
        margin: 0;
      }
    }
  }

  .settings-logo {
    display: flex;
    padding: 16px;
    border-top: 2px solid ${({ theme }) => theme.colors.dark[2]};
  }
`;

const SidebarMenu: React.FC = () => {
  const theme = useTheme();

  console.log(theme);

  return (
    <Wrapper>
      <ul>
        <li>
          <Logo width={32} height={32} />
        </li>
        <li>b</li>
        <li>c</li>
        <li>d</li>
        <li>e</li>
        <li>f</li>
        <li>g</li>
      </ul>
      <span className="settings-logo">s</span>
    </Wrapper>
  );
};

export default SidebarMenu;
