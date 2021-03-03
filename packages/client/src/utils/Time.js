export const getSeconds = (duration = 0) => {
  const seconds = Number((duration / 1000).toFixed(0));
  return seconds;
};

export const getMinutes = (duration = 0) => {
  const minutes = Number((duration / (60 * 1000)).toFixed(0));
  return minutes;
};

export const getHours = (duration = 0) => {
  const hours = Number((duration / (60 * 60 * 1000)).toFixed(0));
  return hours;
};
