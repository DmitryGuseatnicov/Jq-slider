/**
 *  @jest-environment jsdom
 */
import Tip from './Tip';

import { State } from '../../../../types/types';

describe('Test Tip', () => {
  let tip: Tip;
  let slider: HTMLElement;
  let state: State;

  beforeEach(() => {
    slider = document.createElement('div');
    slider.style.width = '1000';
    tip = new Tip(slider);
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

  test('Should be correct className in tip', () => {
    tip.setState(state);
    expect(tip.subView.classList.contains('jq-slider__tip')).toBeTruthy();
  });

  test('Should be cant change isDoable', () => {
    expect(tip.isDouble).toBeFalsy();
    tip.changeIsDouble(true);
    expect(tip.isDouble).toBeTruthy();
  });

  test('Should be showed double value inside subView', () => {
    tip.changeIsDouble(true);
    tip.setState(state);
    expect(tip.subView.textContent).toBe('10 - 90');
  });
});
