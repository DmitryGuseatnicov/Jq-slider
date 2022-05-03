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

  test('Should be correct value innerHTML', () => {
    tip.setState(newState);
    expect(tip.subView.innerHTML).toBe('90');

    newState = { ...newState, to: 30 };
    tip.setState(newState);
    expect(tip.subView.innerHTML).toBe('30');
  });

  test('Should be subView not sizable then isDouble true', () => {
    tip.changeIsDouble(true);
    tip.setState(newState);
    expect(tip.subView.style.opacity).toBe('0');

    tip.changeIsDouble(false);
    tip.setState(newState);
    expect(tip.subView.style.opacity).toBe('1');
  });

  test('Dont must be update when set not correct value', () => {
    newState = { ...newState, to: 'not are number' as any };
    tip.setState(newState);
    expect(tip.subView.innerHTML).toBe('');
  });
});
