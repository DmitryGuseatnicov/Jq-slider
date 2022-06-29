import { SubViewEventCallBack, SubViewEvent, State } from 'types/types';
import EventCreator from 'components/EventCreator/EventCreator';

abstract class SubView extends EventCreator<
  SubViewEvent,
  SubViewEventCallBack
> {
  public slider: HTMLElement;

  public subView!: HTMLElement;

  public state: State;

  constructor(slider: HTMLElement) {
    super();
    this.slider = slider;
    /**
     * Хотелось бы иметь возможность типизировать state каждого subView,
     * чтобы не делать в них лишних проверок поэтому истользовал as зная что сюда
     * точно прийдут правельные данные после инициадизации
     * */
    this.state = {} as State;
  }

  public getPosition(): number {
    if (this.state.horizontal) {
      return this.subView.getBoundingClientRect().top;
    }
    return this.subView.getBoundingClientRect().left;
  }

  // eslint-disable-next-line no-unused-vars
  public abstract setState(state: State): void;

  public abstract init(): void;

  public abstract createSubView(): void;

  public abstract update(): void;
}

export default SubView;
