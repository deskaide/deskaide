import * as React from 'react';
import { useTheme } from 'styled-components';

export const IconNotepad = ({
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
        d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z"
        fill={pathFillColor || theme.colors.text1}
      />
      <path
        d="M7 9h10v2H7V9zm0 4h5v2H7v-2z"
        fill={pathFillColor || theme.colors.text1}
      />
    </svg>
  );
};
