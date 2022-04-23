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
      if (typeof state === 'object') {
        if (!$(this).data('jqSlider')) {
          $(this).data().jqSlider = new Presenter(this, state);
        }
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

  onChange(this: JQuery, callback: (e: CustomEvent) => void) {
    this.each(function () {
      const jqSlider = $(this).data('jqSlider');
      jqSlider.addEventListener('onChange', (e: CustomEvent) => callback(e));
    });
  },
};

$.fn.jqSlider = function (...args): any {
  const isEmptyArgs = args.length === 0 || typeof args[0] === 'object';
  const isUpdate =
    args.length >= 2 && args[0] === 'update' && typeof args[1] === 'object';
  const isGetState = args.length === 1 && args[0] === 'getState';
  const isBindEventListener =
    args.length >= 2 && args[0] === 'onChange' && typeof args[1] === 'function';

  if (isEmptyArgs) {
    const state: Data = args[0] ? args[0] : {};
    return methods.init.call(this, state);
  }

  if (isUpdate) {
    const state: Data = args[1];
    return methods.update.call(this, state);
  }

  if (isGetState) {
    return methods.getState.call(this);
  }

  if (isBindEventListener) {
    const callback: () => void = args[1];
    return methods.onChange.call(this, callback);
  }

  return $.error('This method does not exist');
};

declare global {
  interface JQuery {
    jqSlider(...args: string[] | Data[] | any): void;
    jqSlider(method: 'update', data: Data): void;
    jqSlider(method: 'onChange', func: (event: CustomEvent) => void): void;
  }
}
