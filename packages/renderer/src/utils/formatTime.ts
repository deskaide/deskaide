export const getFormattedTime = (timeInSeconds = 0) => {
  const hours = `0${Math.floor(timeInSeconds / 3600)}`.slice(-2);
  const minutes = `0${Math.floor((timeInSeconds % 3600) / 60)}`.slice(-2);
  const seconds = `0${Math.floor((timeInSeconds % 3600) % 60)}`.slice(-2);

  return { hours, minutes, seconds };
};
