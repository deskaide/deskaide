import * as React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { Box } from './Box';
import { Tooltip } from './Tooltip';
import { Logo } from './Logo';
import { IconJournal } from './IconJournal';
import { IconLink } from './IconLink';
import { IconNotepad } from './IconNotepad';
import { IconSettings } from './IconSettings';
import { IconStopwatch } from './IconStopwatch';
import { IconTask } from './IconTask';

const Wrapper = styled(Box)`
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
    &:focus-visible,
    &.active {
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

export const SidebarMenu: React.FC = () => {
  return (
    <Wrapper>
      <ul>
        <Tooltip message="Deskaide" position="right">
          <li>
            <NavLink
              to="/"
              aria-label="Welcome Screen"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <Logo width={32} height={32} />
            </NavLink>
          </li>
        </Tooltip>

        <Tooltip message="Diary" position="right">
          <li>
            <NavLink
              to="/diary"
              aria-label="Diary"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <IconJournal width={32} height={32} />
            </NavLink>
          </li>
        </Tooltip>
        <Tooltip message="Notes" position="right">
          <li>
            <NavLink
              to="/notes"
              aria-label="Notes"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <IconNotepad width={32} height={32} />
            </NavLink>
          </li>
        </Tooltip>
        <Tooltip message="Links" position="right">
          <li>
            <NavLink
              to="/links"
              aria-label="Links"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <IconLink width={32} height={32} />
            </NavLink>
          </li>
        </Tooltip>
        <Tooltip message="Pomodoro" position="right">
          <li>
            <NavLink
              to="/pomodoro"
              aria-label="Pomodoro"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <IconStopwatch width={32} height={32} />
            </NavLink>
          </li>
        </Tooltip>
        <Tooltip message="Todos" position="right">
          <li>
            <NavLink
              to="/todos"
              aria-label="Todos"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <IconTask width={32} height={32} />
            </NavLink>
          </li>
        </Tooltip>
      </ul>
      <Tooltip message="Settings" position="right">
        <span className="settings-logo" aria-label="Settings">
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <IconSettings width={32} height={32} />
          </NavLink>
        </span>
      </Tooltip>
    </Wrapper>
  );
};
