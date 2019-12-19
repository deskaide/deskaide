import styled from 'styled-components';
import { color, height, width } from 'styled-system';

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.border};

  ${color};
  ${height};
  ${width};
`;

export default Divider;
