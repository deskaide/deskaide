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

const Box: React.FC = styled.div`
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

export default Box;
