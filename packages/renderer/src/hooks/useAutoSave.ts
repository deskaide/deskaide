import { useEffect, useRef } from 'react';
import { useDebounce } from './useDebounce';

export const useAutoSave = <T>(
  data: T,
  interval: number,
  onSave: (data: T) => void,
  isSaveOnUnmountEnabled = true
) => {
  const value = useRef(data);
  const debouncedValue = useDebounce(data, interval);

  useEffect(() => {
    value.current = data;
  }, [data]);

  useEffect(() => {
    let ignoreSave = false;

    if (!ignoreSave) {
      onSave(debouncedValue);
    }

    return () => {
      ignoreSave = true;
    };
  }, [debouncedValue]);

  useEffect(
    () => () => {
      if (isSaveOnUnmountEnabled) {
        onSave(value.current);
      }
    },
    [isSaveOnUnmountEnabled]
  );
};
