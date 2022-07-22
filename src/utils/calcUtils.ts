/* eslint-disable no-mixed-operators */
function convertValueInPercent(
  min: number,
  max: number,
  value: number,
): number {
  return (100 / (max - min)) * (value - min);
}

function convertPixelInPercent(width: number, value: number): number {
  return (100 / width) * value;
}

function convertPercentInValue(
  min: number,
  max: number,
  percent: number,
): number {
  return ((max - min) / 100) * percent + min;
}

function convertPixelInValue(
  min: number,
  max: number,
  width: number,
  value: number,
): number {
  return convertPercentInValue(min, max, convertPixelInPercent(width, value));
}

export {
  convertValueInPercent,
  convertPixelInPercent,
  convertPercentInValue,
  convertPixelInValue,
};
