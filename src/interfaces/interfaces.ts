/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import EventCreator from '../AppComponents/EventCreator/EventCreator';
import { State, SubViewEvent, SubViewEventCallBack } from '../types/types';

interface ISubView extends EventCreator<SubViewEvent, SubViewEventCallBack> {
  slider: HTMLElement
  subView: HTMLElement
  setState(state: State): void
}

interface IModel {

}

export { ISubView, IModel };
