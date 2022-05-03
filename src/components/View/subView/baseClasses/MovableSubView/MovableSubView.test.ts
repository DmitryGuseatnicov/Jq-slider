/**
 *  @jest-environment jsdom
 */
import MovableSubView from './MovableSubView';

import { State } from '../../../../../types/types';

describe('Test Handle', () => {
  let slider: HTMLElement;
  let subView: MovableSubView;
  let newState: State;

  beforeEach(() => {
    slider = document.createElement('div');
    slider.style.width = '1000';
    subView = new MovableSubView(slider);
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
    expect(subView).toBeInstanceOf(MovableSubView);
  });

  test('Should be correct position on slider aria', () => {
    subView.setState(newState);
    expect(subView.subView).toBeInstanceOf(HTMLElement);
    expect(subView.subView.style.left).toBe('10%');

    newState = {
      ...newState,
      min: 0,
      max: 200,
      from: 10,
    };
    subView.setState(newState);
    expect(subView.subView.style.left).toBe('5%');

    newState = {
      ...newState,
      min: -100,
      max: 100,
      from: -90,
    };
    subView.setState(newState);
    expect(subView.subView.style.left).toBe('5%');

    newState = {
      ...newState,
      min: -100,
      max: 100,
      from: 0,
    };
    subView.setState(newState);
    expect(subView.subView.style.left).toBe('50%');
  });

  test('Should be correct role', () => {
    expect(subView.role).toBe('from');
  });
});
