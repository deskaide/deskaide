import styled from 'styled-components';
import {
  compose,
  space,
  color,
  layout,
  position,
  typography,
  border,
  flexbox,
  grid,
  background,
} from 'styled-system';

import type {
  SpaceProps,
  ColorProps,
  LayoutProps,
  PositionProps,
  TypographyProps,
  BorderProps,
  FlexboxProps,
  GridProps,
  BackgroundProps,
} from 'styled-system';

type Props = SpaceProps &
  ColorProps &
  LayoutProps &
  PositionProps &
  TypographyProps &
  BorderProps &
  FlexboxProps &
  GridProps &
  BackgroundProps;

export const MenuListItem = styled.li<Props>`
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.space.md}px;

  :hover {
    outline: 2px solid var(--color-accent-2);
    border-radius: 4px;
  }

  ::before {
    content: '';
  }

  &.active {
    outline: none;
    border-radius: 4px;
    background: var(--color-accent-1);
    color: var(--color-light-1);
  }

  ${compose(
    space,
    color,
    layout,
    position,
    typography,
    border,
    flexbox,
    grid,
    background
  )};
`;
