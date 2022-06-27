/**
 *  @jest-environment jsdom
 */
import SecondTip from './SecondTip';

import { State } from '../../../../types/types';

describe('Test Tip', () => {
  let tip: SecondTip;
  let slider: HTMLElement;
  let state: State;

  beforeEach(() => {
    slider = document.createElement('div');
    slider.style.width = '1000';
    tip = new SecondTip(slider);
    state = {
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

  test('Should be correct value innerHTML', () => {
    tip.setState(state);
    expect(tip.subView.innerHTML).toBe('90');

    state = { ...state, to: 30 };
    tip.setState(state);
    expect(tip.subView.innerHTML).toBe('30');
  });

  test('Should be subView not visible then isDouble true', () => {
    tip.changeIsDouble(true);
    tip.setState(state);
    expect(tip.subView.style.opacity).toBe('0');

    tip.changeIsDouble(false);
    tip.setState(state);
    expect(tip.subView.style.opacity).toBe('1');
  });

  test('Dont must be update when set not correct value', () => {
    state = { ...state, to: 'not are number' as any };
    tip.setState(state);
    expect(tip.subView.innerHTML).toBe('');
  });
});
