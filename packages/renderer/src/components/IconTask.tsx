import * as React from 'react';
import { useTheme } from 'styled-components';

export const IconTask = ({
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
        d="M5 22h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-2a1 1 0 00-1-1H8a1 1 0 00-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2zM5 5h2v2h10V5h2v15H5V5z"
        fill={pathFillColor || theme.colors.text1}
      />
      <path
        d="M11 13.586l-1.793-1.793-1.414 1.414L11 16.414l5.207-5.207-1.414-1.414L11 13.586z"
        fill={pathFillColor || theme.colors.text1}
      />
    </svg>
  );
};
