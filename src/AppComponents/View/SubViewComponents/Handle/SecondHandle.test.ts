/**
 *  @jest-environment jsdom
 */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { Data } from '../../../../types/types';
import SecondHandel from './SecondHandle';

describe('Test Handle', () => {
  let slider: HTMLElement;
  let handle: SecondHandel;

  beforeEach(() => {
    slider = document.createElement('div');
    slider.style.width = '1000';
    handle = new SecondHandel(slider);
  });

  test('Should be instance of Handle', () => {
    expect(handle).toBeInstanceOf(SecondHandel);
  });

  test('Should be correct position on slider aria', () => {
    let newState: Data = { min: 0, max: 200, to: 20 };
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('10%');

    newState = { min: 0, max: 200, to: 10 };
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('5%');

    newState = { min: -100, max: 100, to: -90 };
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('5%');

    newState = { min: -100, max: 100, to: 0 };
    handle.setState(newState);
    expect(handle.subView.style.left).toBe('50%');
  });
});
