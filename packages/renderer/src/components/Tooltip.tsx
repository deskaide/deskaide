import * as React from 'react';
import styled, { css } from 'styled-components';
import { space, color, border } from 'styled-system';

import type { SpaceProps, ColorProps, BorderProps } from 'styled-system';

type TooltipContainerProps = SpaceProps &
  ColorProps &
  BorderProps & {
    position: string;
  };

export type TooltipType = {
  message: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
};

const TooltipContainer = styled.span<TooltipContainerProps>`
  display: flex;
  position: relative;
  width: 100%;

  .tooltip-message {
    display: inline-block;
    width: max-content;
    min-width: 80px;
    visibility: hidden;
    background-color: var(--color-text-2);
    color: var(--color-bg-1);
    text-align: center;
    border-radius: 4px;
    padding: 4px 8px;
    position: absolute;
    z-index: 10;
    ${({ position }) => {
      switch (position) {
        case 'right':
          return css`
            top: 50%;
            left: 110%;
            transform: translateY(-50%);
            ::after {
              top: 50%;
              right: 100%;
              margin-top: -5px;
              border-color: transparent var(--color-text-2) transparent
                transparent;
            }
          `;
        case 'bottom':
          return css`
            top: 110%;
            left: 50%;
            transform: translateX(-50%);
            ::after {
              bottom: 100%;
              left: 50%;
              margin-left: -5px;
              border-color: transparent transparent
                ${({ theme }) => theme.colors.dark[2]} transparent;
            }
          `;
        case 'left':
          return css`
            top: 50%;
            right: 110%;
            transform: translateY(-50%);
            ::after {
              top: 50%;
              left: 100%;
              margin-top: -5px;
              border-color: transparent transparent transparent
                ${({ theme }) => theme.colors.dark[2]};
            }
          `;
        default:
          return css`
            bottom: 110%;
            left: 50%;
            transform: translateX(-50%);
            ::after {
              top: 100%;
              left: 50%;
              margin-left: -5px;
              border-color: ${({ theme }) => theme.colors.dark[2]} transparent
                transparent transparent;
            }
          `;
      }
    }};
    ${color};
    ${space};
    ::after {
      content: ' ';
      position: absolute;
      border-width: 5px;
      border-style: solid;
      ${border};
    }
  }
  &:hover {
    .tooltip-message {
      visibility: visible;
    }
  }
`;

export const Tooltip: React.FC<TooltipType> = ({
  message,
  children,
  position = 'top',
  ...props
}) => (
  <TooltipContainer position={position} {...props}>
    {children}
    <span className="tooltip-message">{message}</span>
  </TooltipContainer>
);
