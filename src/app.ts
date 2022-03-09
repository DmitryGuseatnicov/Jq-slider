/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import './slider.scss';
import Presenter from './AppComponents/Presenter/Presenter';
import { Data } from './types/types';

(function ($) {
  const methods = {
    init(this: JQuery, state?: Data) {
      if (typeof state === 'object') {
        return this.each(function () {
          if (!$(this).data('jqSlider')) {
            $(this).data().jqSlider = new Presenter(this, state);
          }
        });
      }
    },

    update(this: JQuery, state : Data) {
      this.each(function () {
        const jqSlider = $(this).data('jqSlider');
        jqSlider.model.setState(state);
      });
    },

    onChange(this: JQuery, callback: (e: CustomEvent) => void) {
      this.each(function () {
        const jqSlider = $(this).data('jqSlider');
        jqSlider.addEventListener('onChange', (e: CustomEvent) => callback(e));
      });
    },
  };

  $.fn.jqSlider = function (...args) {
    const isEmptyArgs = args.length === 0 || typeof args[0] === 'object';
    const isUpdate = args.length >= 2 && args[0] === 'update' && typeof args[1] === 'object';
    const isBindEventListener = args.length >= 2 && args[0] === 'onChange' && typeof args[1] === 'function';

    if (isEmptyArgs) {
      const state: Data = args[0] ? args[0] : {};
      return methods.init.call(this, state);
    }

    if (isUpdate) {
      const state: Object = args[1];
      return methods.update.call(this, state);
    }

    if (isBindEventListener) {
      const callback: (event: CustomEvent) => void = args[1];
      return methods.onChange.call(this, callback);
    }
  };
}(jQuery));

declare global {
  interface JQuery {
    jqSlider(...args: string[] | Data[] | any): void;
    jqSlider(method: 'update', data: Data): void;
    jqSlider(method: 'onChange', func: (event: CustomEvent) => void): void;
  }
}
