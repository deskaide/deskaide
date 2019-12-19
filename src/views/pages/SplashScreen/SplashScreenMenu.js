import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import { Image } from '../../components';

import clockIconLight from '../../../assets/icons/clock-light.svg';
import noteIconLight from '../../../assets/icons/note-light.svg';
import journalIconLight from '../../../assets/icons/journal-light.svg';
import linkIconLight from '../../../assets/icons/link-light.svg';
import statsIconLight from '../../../assets/icons/stats-light.svg';
import settingsIconLight from '../../../assets/icons/settings-light.svg';

import clockIconDark from '../../../assets/icons/clock-dark.svg';
import noteIconDark from '../../../assets/icons/note-dark.svg';
import journalIconDark from '../../../assets/icons/journal-dark.svg';
import linkIconDark from '../../../assets/icons/link-dark.svg';
import statsIconDark from '../../../assets/icons/stats-dark.svg';
import settingsIconDark from '../../../assets/icons/settings-dark.svg';

const MenuContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  max-width: 50vw;
  flex-wrap: wrap;
  text-align: center;

  li {
    list-style: none;
    width: calc(100% / 3);

    a {
      display: inline-block;
      width: 100%;
      text-decoration: none;
      color: ${({ theme }) => theme.colors.text};
      font-size: ${({ theme }) => theme.typography.h5.fontSize};
      font-weight: ${({ theme }) => theme.typography.h5.fontWeight};
      margin-bottom: ${({ theme }) => `${theme.space[4]}px`};
      outline: none;

      span {
        display: inline-block;
        border-bottom: 2px solid ${({ theme }) => theme.colors.text};
        position: relative;
        top: -9px;
        margin-left: ${({ theme }) => `${theme.space[3]}px`};
      }
    }
  }
`;

const SplashScreenMenu = ({ theme }) => (
  <MenuContainer>
    <li>
      <Link to="/pomodoro">
        <Image
          src={theme.name === 'light' ? clockIconDark : clockIconLight}
          width={32}
        />
        <span>Pomodoro</span>
      </Link>
    </li>
    <li>
      <a href="/">
        <Image
          src={theme.name === 'light' ? noteIconDark : noteIconLight}
          width={32}
        />
        <span>Notes</span>
      </a>
    </li>
    <li>
      <a href="/">
        <Image
          src={theme.name === 'light' ? journalIconDark : journalIconLight}
          width={32}
        />
        <span>Journal</span>
      </a>
    </li>
    <li>
      <a href="/">
        <Image
          src={theme.name === 'light' ? linkIconDark : linkIconLight}
          width={32}
        />
        <span>Links</span>
      </a>
    </li>
    <li>
      <a href="/">
        <Image
          src={theme.name === 'light' ? statsIconDark : statsIconLight}
          width={32}
        />
        <span>Stats</span>
      </a>
    </li>
    <li>
      <a href="/">
        <Image
          src={theme.name === 'light' ? settingsIconDark : settingsIconLight}
          width={32}
        />
        <span>Settings</span>
      </a>
    </li>
  </MenuContainer>
);

export default withTheme(SplashScreenMenu);
