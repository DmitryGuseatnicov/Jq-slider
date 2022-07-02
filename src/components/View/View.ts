import {
  SubViewEvent,
  Data,
  ViewEvent,
  ViewEventCallBack,
  State,
} from 'types/types';
import { convertPixelInPercent } from 'utils/calcUtils';

import Handle from './subView/Handle/Handle';
import SecondHandle from './subView/Handle/SecondHandle';
import Scale from './subView/Scale/Scale';
import Tip from './subView/Tip/Tip';
import SecondTip from './subView/Tip/SecondTip';
import Track from './subView/Track/Track';
import SubView from './subView/baseClasses/abstractSubView/abstractSubView';

import EventCreator from '../EventCreator/EventCreator';

type SubViewComponents =
  | Handle
  | SecondHandle
  | Tip
  | SecondTip
  | Scale
  | Track
  | SubView;

class View extends EventCreator<ViewEvent, ViewEventCallBack> {
  public nodeElem: HTMLElement;

  public slider!: HTMLElement;

  public components: Array<SubViewComponents>;

  private state: State;

  constructor(nodeElem: HTMLElement) {
    super();
    this.nodeElem = nodeElem;
    this.components = [];
    /** истользовал as потому что знаем точно что после инициализации из Model прийдет state типа State,
     * не знаю на сколько уместно так делать но решил рискнуть.
     */
    this.state = {} as State;
    this.init();
  }

  public setState(state: State) {
    if (this.checkIsChangedSettings(state)) {
      this.rebuildSlider(state);
    }
    this.state = { ...this.state, ...state };
    this.update(this.state);
    this.checkTips();
  }

  private init() {
    this.createSlider();
    this.registerEvent('ViewEvent');
  }

  private createSlider() {
    this.slider = document.createElement('div');
    this.slider.classList.add('jq-slider');
    this.nodeElem.appendChild(this.slider);
  }

  private createComponents(state: Data) {
    const { range, tip, scale, horizontal } = state;

    this.components.push(new Handle(this.slider));
    this.components.push(new Track(this.slider));

    if (tip) {
      this.components.push(new Tip(this.slider));
    }

    if (range) {
      this.components.push(new SecondHandle(this.slider));
    }

    if (range && tip) {
      this.components.push(new SecondTip(this.slider));
    }

    if (scale) {
      this.components.push(new Scale(this.slider));
    }

    if (horizontal) {
      this.slider.classList.add('jq-slider_horizontal');
    } else {
      this.slider.classList.remove('jq-slider_horizontal');
    }
  }

  private bindEventListener() {
    this.subViewEventHandler = this.subViewEventHandler.bind(this);

    this.components.forEach((component) => {
      if (component.events.SubViewEvent) {
        component.addEventListener('SubViewEvent', this.subViewEventHandler);
      }
    });
  }

  private subViewEventHandler(e: SubViewEvent) {
    const size = this.state.horizontal
      ? this.slider.clientHeight
      : this.slider.clientWidth;

    if (e.target === 'from') {
      this.dispatchEvent('ViewEvent', {
        from: convertPixelInPercent(size, e.position),
      });
    }

    if (e.target === 'to') {
      this.dispatchEvent('ViewEvent', {
        to: convertPixelInPercent(size, e.position),
      });
    }

    if (e.target === 'track' || e.target === 'scale') {
      const handles = this.getArrOfConcreteSubView(Handle);
      const from = handles[0].getPosition();
      if (!this.state.range) {
        this.dispatchEvent('ViewEvent', {
          from: convertPixelInPercent(size, e.position),
        });
        return;
      }

      const to = handles[1].getPosition();
      if (Math.abs(from - e.position) <= to - e.position) {
        this.dispatchEvent('ViewEvent', {
          from: convertPixelInPercent(size, e.position),
        });
        return;
      }

      this.dispatchEvent('ViewEvent', {
        to: convertPixelInPercent(size, e.position),
      });
    }
  }

  private checkIsChangedSettings(state: State) {
    const { from, to, ...settings } = state;

    return Object.entries(settings).reduce((flag, entries) => {
      const [key, value] = entries;
      if (this.state[key as keyof State] !== value) {
        return true;
      }
      return flag;
    }, false);
  }

  private rebuildSlider(state: State) {
    this.components = [];
    this.slider.innerHTML = '';
    this.createComponents(state);
    this.bindEventListener();
  }

  private checkTips() {
    const { tip, range, horizontal } = this.state;

    if (!(tip && range)) {
      return;
    }

    const tips = this.getArrOfConcreteSubView<Tip>(Tip);
    const size = horizontal
      ? tips[1].subView.clientHeight
      : tips[1].subView.offsetWidth;
    const firstPosition = tips[0].getPosition();
    const secondPosition = tips[1].getPosition() - size;

    if (firstPosition > secondPosition) {
      tips.forEach((t) => {
        t.changeIsDouble(true);
        t.setState(this.state);
      });
    } else {
      tips.forEach((t) => {
        t.changeIsDouble(false);
      });
    }
  }

  private update(state: State) {
    this.components.forEach((component) => component.setState(state));
  }

  private getArrOfConcreteSubView<T extends SubViewComponents = SubView>(
    instance: Function,
  ): Array<T> {
    return this.components.filter(
      (component) => component instanceof instance,
    ) as T[];
    /** Идея данного метода была в том чтобы вернуть массив инстансов определеного класса.
     * у всех этих классов много схожих свойст и методов, но есть и свои особенные. Хотелоть бы
     * просто как агрумент указывать Класс и чтобы TS после этого видел все его свойтва и методы.
     * в итоге после долгих попыток не чего как сделать так через as T[] я к сожелению не придумал.
     */
  }
}

export default View;
