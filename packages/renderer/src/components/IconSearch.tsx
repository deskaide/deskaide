import * as React from 'react';
import { useTheme } from 'styled-components';

export const IconSearch = ({
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
      <path
        d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
        fill="none"
      ></path>
    </svg>
  );
};
