import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Box from './Box';
import Logo from './Logo';
import IconJournal from './IconJournal';
import IconLink from './IconLink';
import IconNotepad from './IconNotepad';
import IconSettings from './IconSettings';
import IconStopwatch from './IconStopwatch';
import IconTask from './IconTask';

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
      border-bottom: 2px solid ${({ theme }) => theme.colors.dark[2]};
      line-height: 0;

      &::before {
        content: '';
        margin: 0;
      }
    }
  }

  a {
    display: inline-block;
    padding: 16px;
    line-height: 0;

    &:hover,
    &:focus-visible {
      background-color: ${({ theme }) => theme.colors.bg1};
    }

    &:focus-visible {
      outline: none;
    }
  }

  .settings-logo {
    display: flex;
    border-top: 2px solid ${({ theme }) => theme.colors.dark[2]};
  }
`;

const SidebarMenu: React.FC = () => {
  return (
    <Wrapper>
      <ul>
        <li>
          <Link to="/">
            <Logo width={32} height={32} />
          </Link>
        </li>
        <li>
          <Link to="/diary">
            <IconJournal width={32} height={32} />
          </Link>
        </li>
        <li>
          <Link to="/notes">
            <IconNotepad width={32} height={32} />
          </Link>
        </li>
        <li>
          <Link to="/links">
            <IconLink width={32} height={32} />
          </Link>
        </li>
        <li>
          <Link to="/pomodoro">
            <IconStopwatch width={32} height={32} />
          </Link>
        </li>
        <li>
          <Link to="/todos">
            <IconTask width={32} height={32} />
          </Link>
        </li>
      </ul>
      <span className="settings-logo">
        <Link to="/settings">
          <IconSettings width={32} height={32} />
        </Link>
      </span>
    </Wrapper>
  );
};

export default SidebarMenu;
