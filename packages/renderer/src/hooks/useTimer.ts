import { useCallback, useEffect, useState } from 'react';

type TimerType = 'INCREMENTAL' | 'DECREMENTAL';

interface TimerConfig {
  initialTime?: number;
  interval?: number;
  step?: number;
  type?: TimerType;
  endTime?: number;
  onTimeOver?: () => void;
}

export const useTimer = (config: TimerConfig) => {
  const {
    initialTime = 0,
    interval = 1000,
    step = 1,
    type = 'INCREMENTAL',
    endTime = 0,
    onTimeOver,
  } = config;
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsTimeOver(false);
    setTime(initialTime);
  }, [initialTime]);

  const start = useCallback(
    (startingTime = 0) => {
      if (isTimeOver) {
        reset();
      }
      if (startingTime) {
        setTime(startingTime);
      }
      setIsRunning(true);
    },
    [reset, isTimeOver]
  );

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning && time === endTime) {
      setIsRunning(false);
      setIsTimeOver(true);

      if (typeof onTimeOver === 'function') {
        onTimeOver();
      }
    }
  }, [endTime, onTimeOver, time, isRunning]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((previousTime) =>
          type === 'DECREMENTAL' ? previousTime - step : previousTime + step
        );
      }, interval);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, step, type, interval]);

  return { isRunning, pause, reset, start, time };
};
