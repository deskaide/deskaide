import styled from 'styled-components';
import { compose, space, color, layout, position, border } from 'styled-system';

import type {
  SpaceProps,
  ColorProps,
  LayoutProps,
  PositionProps,
  BorderProps,
} from 'styled-system';

type Props = SpaceProps &
  ColorProps &
  LayoutProps &
  PositionProps &
  BorderProps;

export const Divider = styled.div<Props>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.text1};
  width: 100%;
  ${compose(space, color, layout, position, border)};
`;
