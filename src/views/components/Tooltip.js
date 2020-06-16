import React from 'react';
import styled, { css } from 'styled-components';
import { space, color, border } from 'styled-system';

const TooltipContainer = styled.span`
  display: inline-block;
  position: relative;
  width: 100%;

  .tooltip-message {
    display: inline-block;
    width: max-content;
    min-width: 80px;
    visibility: hidden;
    background-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.background};
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
              border-color: transparent ${({ theme }) => theme.colors.text}
                transparent transparent;
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
                ${({ theme }) => theme.colors.text} transparent;
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
                ${({ theme }) => theme.colors.text};
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
              border-color: ${({ theme }) => theme.colors.text} transparent
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

const Tooltip = ({ message, children, position = 'top', ...props }) => (
  <TooltipContainer position={position} {...props}>
    {children}
    <span className="tooltip-message">{message}</span>
  </TooltipContainer>
);

export default Tooltip;
