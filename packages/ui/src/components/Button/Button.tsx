import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  variant as generateVariant,
  space,
  typography,
  color,
  layout,
} from 'styled-system';
import type {
  SpaceProps,
  TypographyProps,
  ColorProps,
  LayoutProps,
} from 'styled-system';

type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'destructive';

export const circleGrow = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  } 
  20% {
    opacity: 1;
  }
  100% {
    transform: scale(5);
    opacity: 0;
  }
`;

const variants = {
  primary: {
    backgroundColor: 'primary.1',
    color: 'light.1',
  },
  secondary: {
    backgroundColor: 'text1',
    color: 'bg1',
  },
  warning: {
    backgroundColor: 'warning.1',
    color: 'light.1',
  },
  destructive: {
    backgroundColor: 'error.1',
    color: 'light.1',
  },
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  SpaceProps &
  TypographyProps &
  ColorProps &
  LayoutProps & {
    variant?: ButtonVariant;
    as?: React.ElementType;
    disabled?: boolean;
  };

const ButtonBase = styled.button<ButtonProps>`
  padding: ${({ theme }) => theme.space.md}px ${({ theme }) => theme.space.lg}px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  text-transform: uppercase;
  border-radius: 4px;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.elevations[1]};
  background-color: ${({ theme }) => theme.colors.bg1};
  color: ${({ theme }) => theme.colors.text1};

  &:hover {
    transition: all ease-in-out 0.3s;
    box-shadow: ${({ theme }) => theme.elevations[2]};
  }

  &:disabled {
    opacity: 0.32;
    cursor: not-allowed;
  }

  .button-icon-right,
  .button-icon-left {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.text1};
      }
    }
    position: relative;
    top: 3px;
  }

  .button-icon-right {
    margin-left: ${({ theme }) => theme.space.md}px;

    &.no-margin {
      margin-left: 0;
    }
  }

  .button-icon-left {
    margin-right: ${({ theme }) => theme.space.md}px;

    &.no-margin {
      margin-right: 0;
    }
  }

  .button-icon-secondary {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.bg1};
      }
    }
  }

  .button-text {
    position: relative;
    z-index: 1;

    ::after {
      content: '';
      position: absolute;
      z-index: -1;
      top: calc(50% - 15px);
      left: calc(50% - 15px);
      background: rgba(255, 255, 255, 0.7);
      width: 30px;
      height: 30px;
      border-radius: 100%;
      transform: scale(0);
    }
  }

  :focus:not(:active) {
    .button-text::after {
      animation: ${circleGrow} 0.3s linear;
    }
  }

  ${generateVariant({
    variants,
  })};
  ${space};
  ${typography};
  ${color};
  ${layout};
`;

export const Button: React.FC<
  ButtonProps & {
    variant?: ButtonVariant;
    icon?: React.ReactNode;
    iconPosition?: 'right' | 'left';
    disabled?: boolean;
  }
> = ({ variant = 'default', icon, iconPosition = 'left', ...props }) => {
  return icon ? (
    <ButtonBase variant={variant} {...props}>
      {iconPosition === 'left' ? (
        <>
          <span
            className={`button-icon-${iconPosition} button-icon-${variant} ${
              props.children ? '' : 'no-margin'
            }`}
          >
            {icon}
          </span>
          <span className="button-text">{props.children}</span>
        </>
      ) : (
        <>
          <span className="button-text">{props.children}</span>
          <span
            className={`button-icon-${iconPosition} button-icon-${variant}`}
          >
            {icon}
          </span>
        </>
      )}
    </ButtonBase>
  ) : (
    <ButtonBase variant={variant} {...props}>
      <span className="button-text">{props.children}</span>
    </ButtonBase>
  );
};
