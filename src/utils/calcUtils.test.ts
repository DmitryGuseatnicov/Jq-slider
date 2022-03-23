import { convertPercentInValue, convertPixelInPercent, convertValueInPercent } from './calcUtils';

describe('test calcUtils', () => {
  test('Should be correct convert value in percent', () => {
    expect(convertValueInPercent(0, 100, 50)).toBe(50);
    expect(convertValueInPercent(-10, 100, 30)).toBe(36.36363636363636);
    expect(convertValueInPercent(-40, 100, 40)).toBe(57.142857142857146);
  });

  test('Should be correct convert percent in value', () => {
    expect(convertPercentInValue(0, 1000, 50)).toBe(500);
    expect(convertPercentInValue(-10, 100, 30)).toBe(23);
    expect(convertPercentInValue(-40, 100, 40)).toBe(16);
  });

  test('Should be correct convert pixels in percent', () => {
    expect(convertPixelInPercent(1000, 50)).toBe(5);
    expect(convertPixelInPercent(100, 30)).toBe(30);
    expect(convertPixelInPercent(300, 10)).toBe(3.333333333333333);
  });
});
