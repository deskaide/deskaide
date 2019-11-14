import styled from 'styled-components';
import Box from './Box';

const SettingsMenuContainer = styled(Box)`
  height: 100vh;
  overflow-y: auto;
  border-right: 2px solid ${({ theme }) => theme.colors.border};
`;

export default SettingsMenuContainer;
