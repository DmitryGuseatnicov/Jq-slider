/**
 *  @jest-environment jsdom
 */
import Handle from './Handle';

import { State } from '../../../../types/types';

describe('Test Handle', () => {
  let slider: HTMLElement;
  let handle: Handle;
  let newState: State;

  beforeEach(() => {
    slider = document.createElement('div');
    slider.style.width = '1000';
    handle = new Handle(slider);
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
    expect(handle).toBeInstanceOf(Handle);
  });

  test('Should be correct position on slider aria', () => {
    handle.setState(newState);
    expect(handle.subView).toBeInstanceOf(HTMLElement);
    expect(handle.subView.style.left).toBe('10%');

    newState = {
      ...newState,
      min: 0,
      max: 200,
      from: 10,
    };
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('5%');

    newState = {
      ...newState,
      min: -100,
      max: 100,
      from: -90,
    };
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('5%');

    newState = {
      ...newState,
      min: -100,
      max: 100,
      from: 0,
    };
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('50%');
  });
});
