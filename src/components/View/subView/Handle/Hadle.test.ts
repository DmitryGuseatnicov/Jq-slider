/**
 *  @jest-environment jsdom
 */

import Handle from './Handle';

import { State } from '../../../../types/types';

describe('Test Handle', () => {
  let slider: HTMLElement;
  let handle: Handle;
  let state: State;

  beforeEach(() => {
    state = {
      min: 0,
      max: 100,
      from: 10,
      to: 90,
      step: 1,
      tip: true,
      range: false,
      progress: true,
      scale: true,
      scaleDestiny: 1,
      horizontal: false,
    };

    slider = document.createElement('div');
    slider.style.width = '1000';
    handle = new Handle(slider);
  });

  test('Should be correct className in tip', () => {
    handle.setState(state);
    expect(handle.subView.classList.contains('jq-slider__handle')).toBeTruthy();
  });

  test('Should be correct zIndex after init', () => {
    handle.setState(state);
    expect(handle.subView.style.zIndex).toBe('5');
  });
});
