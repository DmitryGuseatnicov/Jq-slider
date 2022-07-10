import { SubViewEventCallBack, SubViewEvent, State } from 'types/types';
import EventCreator from 'components/EventCreator/EventCreator';
import defaultState from 'defaultState/defaultState';

abstract class SubView extends EventCreator<
  SubViewEvent,
  SubViewEventCallBack
> {
  public slider: HTMLElement;

  public subView!: HTMLElement;

  protected state: State;

  constructor(slider: HTMLElement) {
    super();
    this.slider = slider;
    this.state = { ...defaultState };
  }

  public getPosition(): number {
    if (this.state.horizontal) {
      return this.subView.getBoundingClientRect().top;
    }
    return this.subView.getBoundingClientRect().left;
  }

  public getSize(): number {
    if (this.state.horizontal) {
      return this.subView.getBoundingClientRect().height;
    }
    return this.subView.getBoundingClientRect().width;
  }

  public setState(state: State): void {
    this.state = { ...state };
    this.update();
  }

  protected abstract init(): void;

  protected abstract createSubView(): void;

  protected abstract update(): void;
}

export default SubView;
