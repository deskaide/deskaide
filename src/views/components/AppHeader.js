import styled from 'styled-components';

const AppHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
`;

export default AppHeader;
