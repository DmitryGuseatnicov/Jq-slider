/**
 *  @jest-environment jsdom
 */
import MovableSubView from './MovableSubView';

import { State } from '../../../../../types/types';

describe('Test Handle', () => {
  let slider: HTMLElement;
  let subView: MovableSubView;
  let state: State;

  beforeEach(() => {
    slider = document.createElement('div');
    slider.style.width = '1000';
    subView = new MovableSubView(slider);
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

  test('Should be correct position on slider aria', () => {
    subView.setState(state);
    expect(subView.subView).toBeInstanceOf(HTMLElement);
    expect(subView.subView.style.left).toBe('10%');

    state = {
      ...state,
      min: 0,
      max: 200,
      from: 10,
    };
    subView.setState(state);
    expect(subView.subView.style.left).toBe('5%');

    state = {
      ...state,
      min: -100,
      max: 100,
      from: -90,
    };
    subView.setState(state);
    expect(subView.subView.style.left).toBe('5%');

    state = {
      ...state,
      min: -100,
      max: 100,
      from: 0,
    };
    subView.setState(state);
    expect(subView.subView.style.left).toBe('50%');
  });

  test('Should be correct role', () => {
    expect(subView.role).toBe('from');
  });
});
