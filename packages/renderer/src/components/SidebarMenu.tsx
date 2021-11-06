import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Box from './Box';
import Tooltip from './Tooltip';
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
      line-height: 0;
      border-bottom: 2px solid ${({ theme }) => theme.colors.dark[2]};

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
        <Tooltip message="Deskaide" position="right">
          <li>
            <Link to="/" aria-label="Welcome Screen">
              <Logo width={32} height={32} />
            </Link>
          </li>
        </Tooltip>

        <Tooltip message="Diary" position="right">
          <li>
            <Link to="/diary" aria-label="Diary">
              <IconJournal width={32} height={32} />
            </Link>
          </li>
        </Tooltip>
        <Tooltip message="Notes" position="right">
          <li>
            <Link to="/notes" aria-label="Notes">
              <IconNotepad width={32} height={32} />
            </Link>
          </li>
        </Tooltip>
        <Tooltip message="Links" position="right">
          <li>
            <Link to="/links" aria-label="Links">
              <IconLink width={32} height={32} />
            </Link>
          </li>
        </Tooltip>
        <Tooltip message="Pomodoro" position="right">
          <li>
            <Link to="/pomodoro" aria-label="Pomodoro">
              <IconStopwatch width={32} height={32} />
            </Link>
          </li>
        </Tooltip>
        <Tooltip message="Todos" position="right">
          <li>
            <Link to="/todos" aria-label="Todos">
              <IconTask width={32} height={32} />
            </Link>
          </li>
        </Tooltip>
      </ul>
      <Tooltip message="Settings" position="right">
        <span className="settings-logo" aria-label="Settings">
          <Link to="/settings">
            <IconSettings width={32} height={32} />
          </Link>
        </span>
      </Tooltip>
    </Wrapper>
  );
};

export default SidebarMenu;
