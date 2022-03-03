/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { SubViewEventCallBack, SubViewEvent, State } from '../../../types/types';
import EventCreator from '../../EventCreator/EventCreator';

abstract class SubView extends EventCreator<SubViewEvent, SubViewEventCallBack> {
  slider: HTMLElement;

  protected abstract state: State;

  constructor(slider: HTMLElement) {
    super();
    this.slider = slider;
  }

  public abstract setState(state: State): void

  protected abstract init(): void

  protected abstract createSubView(): void

  protected abstract update(): void
}

export default SubView;
