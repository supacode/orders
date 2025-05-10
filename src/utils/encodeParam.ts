export const encodeParam = (value: string): string => {
  try {
    return encodeURIComponent(value);
  } catch {
    return value;
  }
};
