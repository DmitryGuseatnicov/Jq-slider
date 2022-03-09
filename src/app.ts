/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import './slider.scss';
import Presenter from './AppComponents/Presenter/Presenter';
import { Data, State } from './types/types';

(function ($) {
  const methods = {
    init(this: JQuery, state: Data) {
      if (typeof state === 'object') {
        return this.each(function () {
          if (!$(this).data('jqSlider')) {
            $(this).data().jqSlider = new Presenter(this, state);
          }
        });
      }
    },

    update(state : Data) {
      const jqSlider = $(this).data('jqSlider');
      jqSlider.update({ type: 'updatePlugin', payload: state });
    },

    onChange(this: JQuery, callback: (e: CustomEvent) => void) {
      const jqSlider = $(this).data('jqSlider');
      jqSlider.addEventListener('onChange', (e: CustomEvent) => callback(e));
    },
  };

  $.fn.jqSlider = function (...args) {
    const isEmptyArgs = args.length === 0 || typeof args[0] === 'object';
    const isUpdate = args.length >= 2 && args[0] === 'update';
    const isBindEventListener = args.length >= 2 && args[0] === 'onChange';

    if (isEmptyArgs) {
      const state = args[0] ? args[0] : {};
      return methods.init.call(this, state);
    }

    if (isUpdate && typeof args[1] === 'object') {
      const state = args[1];
      return methods.update.call(this, state);
    }

    if (isBindEventListener && typeof args[1] === 'function') {
      const callback = args[1];
      return methods.onChange.call(this, (e: CustomEvent) => callback);
    }
  };
}(jQuery));

declare global {
  interface JQuery {
    jqSlider(...args: string[] | Object[]): void;
  }
}
