import * as React from 'react';
import { useTheme } from 'styled-components';

export const IconLink = ({
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
        d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707a4.965 4.965 0 00-3.535-1.465 4.965 4.965 0 00-3.535 1.465L4.929 12a5.008 5.008 0 000 7.071 4.984 4.984 0 003.535 1.462A4.981 4.981 0 0012 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 01-4.243 0 3.005 3.005 0 010-4.243l2.122-2.121z"
        fill={pathFillColor || theme.colors.text1}
      />
      <path
        d="M12 4.929l-.707.707 1.414 1.414.707-.707a3.007 3.007 0 014.243 0 3.005 3.005 0 010 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707a4.965 4.965 0 003.535 1.465 4.965 4.965 0 003.535-1.465L19.071 12a5.008 5.008 0 000-7.071 5.006 5.006 0 00-7.071 0z"
        fill={pathFillColor || theme.colors.text1}
      />
    </svg>
  );
};
