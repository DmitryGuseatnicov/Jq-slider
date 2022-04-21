/**
 *  @jest-environment jsdom
 */
import View from './View';

import { State } from '../../types/types';

describe('Test View', () => {
  let view: View;
  let state: State;
  let nodeElem: HTMLElement;

  beforeEach(() => {
    nodeElem = document.createElement('div');
    view = new View(nodeElem);
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

  test('Should be instance of View', () => {
    view.setState(state);
    expect(view).toBeInstanceOf(View);
  });

  test('Should be create correct numbers of components with different params', () => {
    view.setState(state);
    expect(view.components.length).toBe(6);

    state = { ...state, range: false };
    view.setState(state);
    expect(view.components.length).toBe(4);

    state = { ...state, tip: false };
    view.setState(state);
    expect(view.components.length).toBe(3);

    state = { ...state, range: true };
    view.setState(state);
    expect(view.components.length).toBe(4);

    state = {
      ...state,
      range: false,
      tip: false,
      scale: false,
    };
    view.setState(state);
    expect(view.components.length).toBe(2);
  });
});
