import * as React from 'react';
import { useTheme } from 'styled-components';

export const IconJournal = ({
  pathFillColor,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  pathFillColor?: string;
}) => {
  const theme = useTheme();
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.75 4.6A2.6 2.6 0 016.35 2h12.8a2.6 2.6 0 012.6 2.6v14.8a2.6 2.6 0 01-2.6 2.6H6.35a2.6 2.6 0 01-2.6-2.6V4.6zm2.6-.6a.6.6 0 00-.6.6v14.8a.6.6 0 00.6.6h12.8a.6.6 0 00.6-.6V4.6a.6.6 0 00-.6-.6H6.35z"
        fill={pathFillColor || theme.colors.text1}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 2a1 1 0 011 1v18a1 1 0 11-2 0V3a1 1 0 011-1zM2 8a1 1 0 011-1h1.5a1 1 0 010 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h1.5a1 1 0 110 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h1.5a1 1 0 110 2H3a1 1 0 01-1-1z"
        fill={pathFillColor || theme.colors.text1}
      />
    </svg>
  );
};
