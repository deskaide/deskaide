import * as React from 'react';
import { useTheme } from 'styled-components';

export const IconStopwatch = ({
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
        d="M12 5c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"
        fill={pathFillColor || theme.colors.text1}
      />
      <path
        d="M11 9h2v5h-2V9zM9 2h6v2H9V2zm10.293 5.707l-2-2 1.414-1.414 2 2-1.414 1.414z"
        fill={pathFillColor || theme.colors.text1}
      />
    </svg>
  );
};
