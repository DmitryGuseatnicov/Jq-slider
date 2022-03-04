/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { SubViewEventCallBack, SubViewEvent, Data } from '../../../types/types';
import EventCreator from '../../EventCreator/EventCreator';

abstract class SubView extends EventCreator<SubViewEvent, SubViewEventCallBack> {
  public slider: HTMLElement;

  public subView!: HTMLElement;

  protected abstract state: Data;

  constructor(slider: HTMLElement) {
    super();
    this.slider = slider;
  }

  public abstract setState(state: Data): void

  protected abstract init(): void

  protected abstract createSubView(): void

  protected abstract update(): void
}

export default SubView;
