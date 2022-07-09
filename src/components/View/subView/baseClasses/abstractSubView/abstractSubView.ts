import { SubViewEventCallBack, SubViewEvent, State } from 'types/types';
import EventCreator from 'components/EventCreator/EventCreator';

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
    this.state = {} as State;
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

  // eslint-disable-next-line no-unused-vars
  public abstract setState(state: State): void;

  protected abstract init(): void;

  protected abstract createSubView(): void;

  protected abstract update(): void;
}

export default SubView;
