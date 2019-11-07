import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Image from './Image';
import Tooltip from './Tooltip';

import logo from '../../assets/images/logo.svg';
import clockIcon from '../../assets/icons/clock.svg';
import noteIcon from '../../assets/icons/note.svg';
import journalIcon from '../../assets/icons/journal.svg';
import linkIcon from '../../assets/icons/link.svg';
import statsIcon from '../../assets/icons/stats.svg';
import settingsIcon from '../../assets/icons/settings.svg';

const MenuContainer = styled.ul`
  height: 100vh;
  text-align: center;
  border-right: 2px solid ${({ theme }) => theme.colors.lightDark};

  li {
    a {
      display: inline-block;
      height: 72px;
      width: 100%;
      border-bottom: 2px solid ${({ theme }) => theme.colors.lightDark};
    }
  }
`;

const MainMenu = () => (
  <MenuContainer>
    <li>
      <Link to="/">
        <Image src={logo} width={32} />
      </Link>
    </li>
    <Tooltip
      message="Pomodoro"
      bg="text"
      color="background"
      borderRightColor="text"
    >
      <li>
        <Link to="/pomodoro">
          <Image src={clockIcon} width={24} />
        </Link>
      </li>
    </Tooltip>
    <li>
      <Link to="/notes">
        <Image src={noteIcon} width={24} />
      </Link>
    </li>
    <li>
      <Link to="/journals">
        <Image src={journalIcon} width={24} />
      </Link>
    </li>
    <li>
      <Link to="/links">
        <Image src={linkIcon} width={24} />
      </Link>
    </li>
    <li>
      <Link to="/stats">
        <Image src={statsIcon} width={24} />
      </Link>
    </li>
    <li>
      <Link to="/settings">
        <Image src={settingsIcon} width={24} />
      </Link>
    </li>
  </MenuContainer>
);

export default MainMenu;
