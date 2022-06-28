import EventCreator from '../../../../EventCreator/EventCreator';
import {
  SubViewEventCallBack,
  SubViewEvent,
  State,
  Data,
} from '../../../../../types/types';

abstract class SubView<T extends Data = Data> extends EventCreator<
  SubViewEvent,
  SubViewEventCallBack
> {
  public slider: HTMLElement;

  public subView!: HTMLElement;

  protected state: T;

  constructor(slider: HTMLElement) {
    super();
    this.slider = slider;
    /**
     * Хотелось бы иметь возможность типизировать state каждого subView,
     * чтобы не делать в них лишних проверок поэтому истользовал as зная что сюда
     * точно прийдут правельные данные после инициадизации
     * */
    this.state = {} as T;
  }

  public getPosition(): number {
    if (this.state.horizontal) {
      return this.subView.getBoundingClientRect().top;
    }
    return this.subView.getBoundingClientRect().left;
  }

  // eslint-disable-next-line no-unused-vars
  public abstract setState(state: State): void;

  protected abstract init(): void;

  protected abstract createSubView(): void;

  protected abstract update(): void;
}

export default SubView;
