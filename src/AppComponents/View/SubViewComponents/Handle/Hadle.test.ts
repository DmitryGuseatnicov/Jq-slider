/**
 *  @jest-environment jsdom
 */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { State } from '../../../../types/types';
import Handle from './Handle';

describe('Test Handle', () => {
  let slider: HTMLElement;
  let handle: Handle;

  beforeEach(() => {
    slider = document.createElement('div');
    slider.style.width = '1000';
    handle = new Handle(slider);
  });

  test('Should be instance of Handle', () => {
    expect(handle).toBeInstanceOf(Handle);
  });

  test('Should be correct position on slider aria', () => {
    let newState: State = { min: 0, max: 200, from: 20 };
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('10%');
    newState = { min: 0, max: 200, from: 10 };
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('5%');

    newState = { min: -100, max: 100, from: -90 };
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('5%');

    newState = { min: -100, max: 100, from: 0 };
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('50%');
  });
});
