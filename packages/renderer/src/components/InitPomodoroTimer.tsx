import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { manageTimer } from '#preload';

import { IpcEventTypes, TimerType } from '../../../../types';
import { A_MINUTE } from '../config';
import { useAppDispatch, useTimer } from '../hooks';
import type { RootState } from '../store';
import { getPomodoroSettings } from '../store/settingsSlice';
import { setCurrentFocusTime, setTimerType } from '../store/timerSlice';
import { sendNotification, showBreakWindow } from '../utils';

export const InitPomodoroTimer = () => {
  const { timerType } = useSelector((state: RootState) => state.timer);
  const { pomodoroSettings } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useAppDispatch();

  const { currentTime, start, reset } = useTimer({
    type: 'DECREMENTAL',
    duration: 0,
    notificationTime: pomodoroSettings.remindBefore,
    onTimeOver: () => {
      dispatch(setTimerType(TimerType.BreakTimer));
      reset();
      showBreakWindow();
    },
  });

  useEffect(() => {
    let ignoreFetch = false;
    if (!ignoreFetch) {
      dispatch(getPomodoroSettings());
    }

    return () => {
      ignoreFetch = true;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash.includes('break')) {
      dispatch(setTimerType(TimerType.BreakTimer));
    }

    if (manageTimer) {
      manageTimer(IpcEventTypes.ToggleTimerType, (value) => {
        dispatch(setTimerType(value));
      });
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    if (!ignore && currentTime === pomodoroSettings.remindBefore) {
      console.log(currentTime);
      sendNotification({
        title: 'Hello There!',
        body: ` A short break will start within ${pomodoroSettings.remindBefore} seconds`,
        tag: TimerType.BreakTimer,
        renotify: false,
      });
    }

    return () => {
      ignore = true;
    };
  }, [currentTime]);

  useEffect(() => {
    if (timerType === TimerType.PomodoroTimer) {
      start(pomodoroSettings.focusTime * A_MINUTE);
    }
    return () => {
      reset();
    };
  }, [pomodoroSettings.focusTime, reset, start, timerType]);

  useEffect(() => {
    if (timerType === TimerType.PomodoroTimer) {
      dispatch(setCurrentFocusTime(currentTime));
    } else {
      reset();
      dispatch(setCurrentFocusTime(0));
    }
    return () => {
      dispatch(setCurrentFocusTime(0));
    };
  }, [dispatch, timerType, currentTime, reset]);

  return <></>;
};
