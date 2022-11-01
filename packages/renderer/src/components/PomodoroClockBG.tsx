import * as React from 'react';
import { useTheme } from 'styled-components';

export const PomodoroClockBG = ({
  bgBottomFill,
  bgMiddleFill,
  bgTopFill,
  isRotateOn,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  bgBottomFill?: string;
  bgMiddleFill?: string;
  bgTopFill?: string;
  isRotateOn: boolean;
}) => {
  const theme = useTheme();
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      id="pomodoro-clock"
      viewBox="0 0 510 520"
    >
      <path
        d="M471.814 124.031c38.756 66.912 28.156 161.981-15.9 239.493-43.725 77.181-120.906 136.806-198.087 136.475-76.85 0-153.7-59.625-196.1-136.144-42.4-76.518-50.35-169.93-11.925-236.512 38.425-66.58 123.225-106.662 209.35-107.324 86.456-.994 174.237 37.43 212.662 104.012Z"
        fill={bgBottomFill || theme.colors.primary[0]}
        className="pomodoro-bg-0"
      >
        {isRotateOn && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 260.35260009765625 260.00025939941406"
            to="360 260.35260009765625 260.00025939941406"
            dur="3s"
            repeatCount="indefinite"
          />
        )}
      </path>
      <path
        d="M424.424 165.831c29.183 58.895 16.449 134.238-19.366 191.541-35.814 57.569-94.444 97.363-153.339 97.628-58.895 0-118.056-39.529-152.013-95.771-33.692-56.507-42.182-129.728-12.734-188.888 29.713-59.161 97.362-104.26 166.869-105.322 69.772-1.06 141.136 41.651 170.583 100.812Z"
        fill={bgMiddleFill || theme.colors.primary[1]}
        className="pomodoro-bg-1"
      >
        {isRotateOn && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 254.78392028808594 259.9998550415039"
            to="360 254.78392028808594 259.9998550415039"
            dur="2.9s"
            repeatCount="indefinite"
          />
        )}
      </path>
      <path
        d="M364.616 201.438c21.347 36.737 20.685 86.546-1.159 122.125-21.678 35.578-64.372 56.925-106.238 56.429-41.867-.331-82.906-22.837-106.57-59.574-23.498-36.571-29.786-87.539-9.267-123.779 20.685-36.24 67.847-57.753 113.189-56.594 45.176.992 88.698 24.656 110.045 61.393Z"
        fill={bgTopFill || theme.colors.primary[2]}
        className="pomodoro-bg-2"
      >
        {isRotateOn && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 254.62026977539062 260.00045013427734"
            to="360 254.62026977539062 260.00045013427734"
            dur="2.8s"
            repeatCount="indefinite"
          />
        )}
      </path>
    </svg>
  );
};
