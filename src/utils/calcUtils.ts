/* eslint-disable import/prefer-default-export */
/* eslint-disable no-mixed-operators */
function convertValueInPercent(min: number, max: number, value: number): number {
  return 100 / (max - min) * (value - min);
}

export { convertValueInPercent };
