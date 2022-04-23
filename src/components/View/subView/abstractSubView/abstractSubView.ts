import EventCreator from '../../../EventCreator/EventCreator';
import {
  SubViewEventCallBack,
  SubViewEvent,
  Data,
} from '../../../../types/types';

abstract class SubView extends EventCreator<
  SubViewEvent,
  SubViewEventCallBack
> {
  public slider: HTMLElement;

  public subView!: HTMLElement;

  protected state: Data;

  constructor(slider: HTMLElement) {
    super();
    this.slider = slider;
    this.state = {};
  }

  public getPosition(): number {
    if (this.state.horizontal) {
      return this.subView.getBoundingClientRect().top;
    }
    return this.subView.getBoundingClientRect().left;
  }

  // eslint-disable-next-line no-unused-vars
  public abstract setState(state: Data): void;

  protected abstract init(): void;

  protected abstract createSubView(): void;

  protected abstract update(): void;
}

export default SubView;
