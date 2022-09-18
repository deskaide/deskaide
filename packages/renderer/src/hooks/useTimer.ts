import { useCallback, useEffect, useState } from 'react';

type TimerType = 'INCREMENTAL' | 'DECREMENTAL';

interface TimerConfig {
  duration?: number;
  type?: TimerType;
  notificationTime?: number;
  onTimeOver?: () => void;
  onShowNotification?: () => void;
}

export const useTimer = (config: TimerConfig) => {
  const {
    duration = 0,
    type = 'INCREMENTAL',
    onTimeOver,
    notificationTime = 30,
    onShowNotification,
  } = config;
  const interval = 1000;
  const [time, setTime] = useState(duration);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [hasNotificationShown, setHasNotificationShown] = useState(false);

  const reset = useCallback(() => {
    setStartTime(Date.now());
    setIsRunning(false);
    setIsTimeOver(false);
    setHasNotificationShown(false);
    setCurrentTime(duration);
    setTime(duration);
  }, [duration]);

  const start = useCallback(
    (startingTime = 0) => {
      if (isTimeOver) {
        reset();
      }
      if (startingTime) {
        setTime(startingTime);
        if (type === 'DECREMENTAL') {
          setCurrentTime(startingTime);
        }
      }
      setIsRunning(true);
    },
    [isTimeOver, reset, type]
  );

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning && currentTime === notificationTime) {
      if (typeof onShowNotification === 'function') {
        if (!hasNotificationShown) {
          onShowNotification();
          setHasNotificationShown(true);
        }
      }
    }

    if (isRunning && currentTime !== notificationTime && hasNotificationShown) {
      setHasNotificationShown(false);
    }

    if (
      isRunning &&
      ((type === 'DECREMENTAL' && currentTime === 0) ||
        (type === 'INCREMENTAL' && currentTime === time))
    ) {
      setIsRunning(false);
      setIsTimeOver(true);

      if (typeof onTimeOver === 'function') {
        onTimeOver();
      }
    }
  }, [
    onTimeOver,
    currentTime,
    isRunning,
    notificationTime,
    hasNotificationShown,
    onShowNotification,
    type,
    time,
  ]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        const setpSeconds = Math.floor((Date.now() - startTime) / 1000);

        setCurrentTime(() =>
          type === 'DECREMENTAL' ? time - setpSeconds : setpSeconds
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
  }, [isRunning, type, interval, time, startTime]);

  return { isRunning, pause, reset, start, currentTime };
};
