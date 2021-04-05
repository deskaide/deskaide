import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';

import Image from './Image';
import Tooltip from './Tooltip';

import logoLight from '../../assets/images/logo-light.svg';
import logoDark from '../../assets/images/logo-dark.svg';

import clockIconLight from '../../assets/icons/clock-light.svg';
import noteIconLight from '../../assets/icons/note-light.svg';
import journalIconLight from '../../assets/icons/journal-light.svg';
import linkIconLight from '../../assets/icons/link-light.svg';
import statsIconLight from '../../assets/icons/stats-light.svg';
import settingsIconLight from '../../assets/icons/settings-light.svg';

import clockIconDark from '../../assets/icons/clock-dark.svg';
import noteIconDark from '../../assets/icons/note-dark.svg';
import journalIconDark from '../../assets/icons/journal-dark.svg';
import linkIconDark from '../../assets/icons/link-dark.svg';
import statsIconDark from '../../assets/icons/stats-dark.svg';
import settingsIconDark from '../../assets/icons/settings-dark.svg';

const MenuContainer = styled.ul`
  height: 100vh;
  text-align: center;
  border-right: 2px solid ${({ theme }) => theme.colors.border};

  li {
    a {
      display: inline-block;
      height: 72px;
      width: 100%;
      border-bottom: 2px solid ${({ theme }) => theme.colors.border};
    }
  }
`;

const MainMenu = ({ theme }) => (
  <MenuContainer>
    <Tooltip message="Desk Aide" position="right">
      <li className="test">
        <Link to="/">
          <Image
            src={theme.name === 'light' ? logoDark : logoLight}
            width={32}
            height="100%"
          />
        </Link>
      </li>
    </Tooltip>
    <Tooltip message="Pomodoro" position="right">
      <li>
        <Link to="/pomodoro">
          <Image
            src={theme.name === 'light' ? clockIconDark : clockIconLight}
            width={24}
            height="100%"
          />
        </Link>
      </li>
    </Tooltip>
    <Tooltip message="Notes" position="right">
      <li>
        <Link to="/notes">
          <Image
            src={theme.name === 'light' ? noteIconDark : noteIconLight}
            width={24}
            height="100%"
          />
        </Link>
      </li>
    </Tooltip>
    <Tooltip message="Journals" position="right">
      <li>
        <Link to="/journals">
          <Image
            src={theme.name === 'light' ? journalIconDark : journalIconLight}
            width={24}
            height="100%"
          />
        </Link>
      </li>
    </Tooltip>
    <Tooltip message="Links" position="right">
      <li>
        <Link to="/links">
          <Image
            src={theme.name === 'light' ? linkIconDark : linkIconLight}
            width={24}
            height="100%"
          />
        </Link>
      </li>
    </Tooltip>
    <Tooltip message="Stats" position="right">
      <li>
        <Link to="/stats">
          <Image
            src={theme.name === 'light' ? statsIconDark : statsIconLight}
            width={24}
            height="100%"
          />
        </Link>
      </li>
    </Tooltip>
    <Tooltip message="Settings" position="right">
      <li>
        <Link to="/settings">
          <Image
            src={theme.name === 'light' ? settingsIconDark : settingsIconLight}
            width={24}
            height="100%"
          />
        </Link>
      </li>
    </Tooltip>
  </MenuContainer>
);

export default withTheme(MainMenu);
