import * as React from 'react';
import { useTheme } from 'styled-components';

export const IconPlus = ({
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
      fill={pathFillColor || theme.colors.text1}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
    </svg>
  );
};
