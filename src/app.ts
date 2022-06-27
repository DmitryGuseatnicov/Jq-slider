/* eslint-disable fsd/no-function-declaration-in-event-listener */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */

import Presenter from './components/Presenter/Presenter';
import { Data, State } from './types/types';
import './slider.scss';

const methods = {
  init(this: JQuery, state?: Data) {
    return this.each(function () {
      const isInit = typeof state === 'object' && !$(this).data('jqSlider');

      if (isInit) {
        $(this).data().jqSlider = new Presenter(this, state);
      }
    });
  },

  update(this: JQuery, state: Data) {
    this.each(function () {
      const jqSlider = $(this).data('jqSlider');
      jqSlider.model.setState(state);
    });
  },

  getState(): State {
    const jqSlider = $(this).data('jqSlider');
    const state: State = jqSlider.model.getState();
    return state;
  },

  onChange(this: JQuery, callback: (e: State) => void) {
    this.each(function () {
      const jqSlider = $(this).data('jqSlider');
      jqSlider.addEventListener('onChange', (e: State) => callback(e));
    });
  },
};

$.fn.jqSlider = function (
  ...args:
    | Data[]
    | ['getState']
    | [method: 'update', data: Data]
    | [method: 'onChange', func: (event: State) => void]
) {
  if (args.length <= 0) {
    const state: Data = {};
    return methods.init.call(this, state);
  }

  if (typeof args[0] === 'object') {
    const state: Data = args[0] ? args[0] : {};
    return methods.init.call(this, state);
  }

  const isGetState = args.length === 1 && args[0] === 'getState';
  if (isGetState) {
    return methods.getState.call(this);
  }

  const isBindEventListener = args.length >= 2 && args[0] === 'onChange';
  if (isBindEventListener && typeof args[1] === 'function') {
    const callback: (e: State) => void = args[1];
    return methods.onChange.call(this, callback);
  }

  const isUpdate =
    args.length >= 2 && args[0] === 'update' && typeof args[1] === 'object';

  if (isUpdate) {
    const state: Data = args[1];
    return methods.update.call(this, state);
  }

  return $.error('This method does not exist');
};

declare global {
  interface JQuery {
    jqSlider(): void;
    jqSlider(method: 'getState'): void;
    jqSlider(method: 'update', data: Data): void;
    jqSlider(method: 'onChange', func: (event: State) => void): void;
  }
}
