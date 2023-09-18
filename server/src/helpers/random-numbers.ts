export const setRandomNumber = (min: number, max: number) => {
  return Math.trunc(Math.random() * (max - min + 1) + min);
};
