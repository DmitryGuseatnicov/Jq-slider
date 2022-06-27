/**
 *  @jest-environment jsdom
 */
import View from './View';

import { State, ViewEvent } from '../../types/types';

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

  test('Should be add modification then is horizontal', () => {
    state = { ...state, horizontal: true };
    view.setState(state);
    expect(view.slider.classList.contains('jq-slider_horizontal')).toBeTruthy();
  });

  test('Should be change inner slider then update settings', () => {
    view.setState(state);
    const oldInnerHTML = view.slider.innerHTML;

    state = { ...state, horizontal: true };
    view.setState(state);
    const newInnerHTML = view.slider.innerHTML;
    expect(oldInnerHTML === newInnerHTML).toBeFalsy();

    state = { ...state, horizontal: false, tip: false };
    view.setState(state);
    const newInnerHTML2 = view.slider.innerHTML;
    expect(oldInnerHTML === newInnerHTML2).toBeFalsy();
  });

  test('Should be dispatch ViewEvent when was Event in SubView with role from', () => {
    view.setState(state);
    const checkDispatch = (e: ViewEvent) => {
      expect(Object.keys(e)[0]).toBe('from');
    };

    view.addEventListener('ViewEvent', checkDispatch);

    view.components[0].dispatchEvent('SubViewEvent', {
      target: 'from',
      position: 10,
    });

    state = { ...state, range: false };
    view.setState(state);
    view.components[1].dispatchEvent('SubViewEvent', {
      target: 'scale',
      position: 10,
    });

    view.components[1].dispatchEvent('SubViewEvent', {
      target: 'track',
      position: 10,
    });
  });

  test('Should be dispatch ViewEvent when was Event in SubView with role to', () => {
    view.setState(state);
    const checkDispatch = (e: ViewEvent) => {
      expect(Object.keys(e)[0]).toBe('to');
    };

    view.addEventListener('ViewEvent', checkDispatch);

    view.components[0].dispatchEvent('SubViewEvent', {
      target: 'to',
      position: 10,
    });

    view.components[1].dispatchEvent('SubViewEvent', {
      target: 'track',
      position: 1000,
    });
  });
});
