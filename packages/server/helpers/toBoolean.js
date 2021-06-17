export default function toBoolean(value) {
  if (
    value === 'Yes' ||
    value === 'yes' ||
    value === 'Y' ||
    value === 'y' ||
    value === '1' ||
    value === 1 ||
    value === 'true' ||
    value === true
  ) {
    return true;
  }

  return false;
}
