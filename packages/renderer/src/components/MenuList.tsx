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

export const MenuList = styled.ul<Props>`
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
