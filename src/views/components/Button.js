import styled, { css } from 'styled-components';
import { space, color, width, height } from 'styled-system';

const Button = styled.button`
  border: none;
  border-radius: 4px;
  outline: none;
  padding: 8px 16px;
  min-width: 60px;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 0 0 2px ${({ theme }) => theme.colors.dark};

  ${space};
  ${color};
  ${width};
  ${height};

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.text};
        `;
      default:
        return css`
          background: ${({ theme }) =>
            theme.name === 'light'
              ? theme.colors.light
              : theme.colors.lightDark};
          color: ${({ theme }) => theme.colors.text};
        `;
    }
  }};
`;

export default Button;
