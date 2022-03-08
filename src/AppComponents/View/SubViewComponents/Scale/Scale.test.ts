/**
 *  @jest-environment jsdom
 */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { State } from '../../../../types/types';
import Scale from './Scale';

describe('Test scale', () => {
  let scale: Scale;
  let state: State;
  let slider: HTMLElement;
  beforeEach(() => {
    slider = document.createElement('div');
    slider.style.width = '1000';
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

  test('Should be instance of Scale', () => {
    expect(scale).toBeInstanceOf(Scale);
  });

  test('Should be created scale HTML', () => {
    scale.setState(state);
    expect(scale.subView).toBeInstanceOf(HTMLElement);
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
});
