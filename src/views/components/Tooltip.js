import React from 'react';
import styled from 'styled-components';
import { space, position, color, border } from 'styled-system';

const TooltipContainer = styled.span`
  display: inline-block;
  position: relative;
  width: 100%;

  .tooltip-message {
    display: inline-block;
    width: auto;
    visibility: hidden;
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    border-radius: 4px;
    padding: 4px 8px;
    white-space: nowrap;

    /* Position the tooltip */
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 110%;
    transform: translateY(-50%);

    ${color};
    ${space};
    ${position};

    ::after {
      content: ' ';
      position: absolute;
      top: 50%;
      right: 100%; /* To the left of the tooltip */
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent black transparent transparent;
      ${border}
    }
  }

  &:hover {
    .tooltip-message {
      visibility: visible;
    }
  }
`;

const Tooltip = ({ message, children, ...props }) => (
  <TooltipContainer {...props}>
    {children}
    <span className="tooltip-message">{message}</span>
  </TooltipContainer>
);

export default Tooltip;
