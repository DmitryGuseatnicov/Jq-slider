/**
 *  @jest-environment jsdom
 */
import SecondTip from './SecondTip';
import { State } from '../../../../types/types';

describe('Test Tip', () => {
  let tip: SecondTip;
  let slider: HTMLElement;
  let newState: State;

  beforeEach(() => {
    slider = document.createElement('div');
    slider.style.width = '1000';
    tip = new SecondTip(slider);
    newState = {
      min: 0,
      max: 100,
      from: 10,
      to: 90,
      step: 1,
      tip: true,
      range: true,
      progress: true,
      scale: true,
      scaleDestiny: 1,
      horizontal: false,
    };
  });

  test('Should be instance of Tip', () => {
    expect(tip).toBeInstanceOf(SecondTip);
  });

  test('Should be correct position on slider aria', () => {
    newState = {
      ...newState, min: 0, max: 200, to: 20,
    };
    tip.setState(newState);
    expect(tip.subView.style.left).toBe('10%');

    newState = {
      ...newState, min: 0, max: 200, to: 10,
    };
    tip.setState(newState);
    expect(tip.subView.style.left).toBe('5%');

    newState = {
      ...newState, min: -100, max: 100, to: -90,
    };
    tip.setState(newState);
    expect(tip.subView.style.left).toBe('5%');

    newState = {
      ...newState, min: -100, max: 100, to: 0,
    };
    tip.setState(newState);
    expect(tip.subView.style.left).toBe('50%');
  });
});
