/**
 *  @jest-environment jsdom
 */
import SecondHandel from './SecondHandle';

import { State } from '../../../../types/types';

describe('Test Handle', () => {
  let slider: HTMLElement;
  let handle: SecondHandel;
  let newState: State;

  beforeEach(() => {
    slider = document.createElement('div');
    slider.style.width = '1000';
    handle = new SecondHandel(slider);
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

  test('Should be instance of Handle', () => {
    expect(handle).toBeInstanceOf(SecondHandel);
  });

  test('Should be correct position on slider aria', () => {
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('90%');

    newState = {
      ...newState,
      min: 0,
      max: 200,
      to: 10,
    };
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('5%');

    newState = {
      ...newState,
      min: -100,
      max: 100,
      to: -90,
    };
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('5%');

    newState = {
      ...newState,
      min: -100,
      max: 100,
      to: 0,
    };
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('50%');
  });
});
