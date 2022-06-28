/**
 *  @jest-environment jsdom
 */
import Scale from './Scale';

import { State } from '../../../../types/types';

describe('Test scale', () => {
  let scale: Scale;
  let state: State;
  let slider: HTMLElement;

  beforeEach(() => {
    slider = document.createElement('div');
    slider.style.width = '1000';
    slider.style.height = '1000';
    scale = new Scale(slider);
    state = {
      min: 0,
      max: 100,
      from: 0,
      to: 100,
      step: 5,
      tip: true,
      range: true,
      progress: true,
      scale: true,
      scaleDestiny: 10,
      horizontal: false,
    };
  });

  test('Should be created scale HTML', () => {
    scale.setState(state);
    expect(scale.subView).toBeInstanceOf(HTMLElement);
  });

  test('Should be add correct class', () => {
    scale.setState(state);
    expect(scale.subView.classList.contains('jq-slider__scale')).toBeTruthy();
  });

  test('Should be correct numbers of pip', () => {
    scale.setState(state);
    let pips = scale.subView.querySelectorAll('.jq-slider__scale-pip');
    expect(pips.length).toBe(11);

    state = { ...state, scaleDestiny: 20 };
    scale.setState(state);
    pips = scale.subView.querySelectorAll('.jq-slider__scale-pip');
    expect(pips.length).toBe(6);

    state = { ...state, scaleDestiny: 1 };
    scale.setState(state);
    pips = scale.subView.querySelectorAll('.jq-slider__scale-pip');
    expect(pips.length).toBe(101);
  });

  test('Should ve add in subView correct class', () => {
    expect(scale.subView.classList.contains('jq-slider__scale')).toBeTruthy();
  });

  test('Should correct added percent in style', () => {
    scale.setState(state);
    const pips = scale.subView.querySelectorAll('.jq-slider__scale-pip');

    if (pips[0] instanceof HTMLElement) {
      expect(pips[0].style.left).toBe('0%');
    }

    if (pips[2] instanceof HTMLElement) {
      expect(pips[2].style.left).toBe('20%');
    }

    if (pips[5] instanceof HTMLElement) {
      expect(pips[5].style.left).toBe('50%');
    }

    if (pips[7] instanceof HTMLElement) {
      expect(pips[7].style.left).toBe('70%');
    }
  });

  test('Should dont be new render pips if state not chanced', () => {
    scale.setState(state);
    const oldInnerHTML = scale.subView.innerHTML;

    scale.setState(state);
    const newInnerHTML = scale.subView.innerHTML;

    expect(oldInnerHTML === newInnerHTML).toBeTruthy();
  });

  test('Should be new render pips if state was chanced', () => {
    scale.setState(state);
    const oldInnerHTML = scale.subView.innerHTML;

    state = { ...state, scaleDestiny: 20, horizontal: true };
    scale.setState(state);
    const newInnerHTML = scale.subView.innerHTML;

    expect(oldInnerHTML === newInnerHTML).toBeFalsy();
  });
});
