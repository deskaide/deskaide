import React from 'react';
import styled from 'styled-components';
import { Image } from '../../components';
import clockIcon from '../../../assets/icons/clock.svg';
import noteIcon from '../../../assets/icons/note.svg';
import journalIcon from '../../../assets/icons/journal.svg';
import linkIcon from '../../../assets/icons/link.svg';
import statsIcon from '../../../assets/icons/stats.svg';
import settingsIcon from '../../../assets/icons/settings.svg';

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

const SplashScreenMenu = () => (
  <MenuContainer>
    <li>
      <a href="/">
        <Image src={clockIcon} width={32} />
        <span>Pomodoro</span>
      </a>
    </li>
    <li>
      <a href="/">
        <Image src={noteIcon} width={32} />
        <span>Notes</span>
      </a>
    </li>
    <li>
      <a href="/">
        <Image src={journalIcon} width={32} />
        <span>Journal</span>
      </a>
    </li>
    <li>
      <a href="/">
        <Image src={linkIcon} width={32} />
        <span>Links</span>
      </a>
    </li>
    <li>
      <a href="/">
        <Image src={statsIcon} width={32} />
        <span>Stats</span>
      </a>
    </li>
    <li>
      <a href="/">
        <Image src={settingsIcon} width={32} />
        <span>Settings</span>
      </a>
    </li>
  </MenuContainer>
);

export default SplashScreenMenu;
