import Handle from './subView/Handle/Handle';
import SecondHandle from './subView/Handle/SecondHandle';
import Scale from './subView/Scale/Scale';
import Tip from './subView/Tip/Tip';
import SecondTip from './subView/Tip/SecondTip';
import Track from './subView/Track/Track';
import SubView from './subView/abstractSubView/abstractSubView';

import EventCreator from '../EventCreator/EventCreator';
import { convertPixelInPercent } from '../../utils/calcUtils';
import {
  SubViewEvent,
  Data,
  ViewEvent,
  ViewEventCallBack,
} from '../../types/types';

class View extends EventCreator<ViewEvent, ViewEventCallBack> {
  public nodeElem: HTMLElement;

  public slider!: HTMLElement;

  public components: Array<SubView>;

  private state: Data;

  constructor(nodeElem: HTMLElement) {
    super();
    this.nodeElem = nodeElem;
    this.components = [];
    this.state = {};
    this.init();
  }

  public setState(state: Data) {
    this.checkIsChangedSettings(state);
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
      this.slider.classList.add('jq-slider--horizontal');
    } else {
      this.slider.classList.remove('jq-slider--horizontal');
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

    if (e.target === 'handle') {
      this.dispatchEvent('ViewEvent', {
        from: convertPixelInPercent(size, e.position),
      });
    }

    if (e.target === 'secondHandle') {
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

  private checkIsChangedSettings(state: Data) {
    const { range, tip, scale, horizontal, progress, scaleDestiny } = state;

    const isUpdateSettings =
      range !== this.state.range ||
      tip !== this.state.tip ||
      scale !== this.state.scale ||
      horizontal !== this.state.horizontal ||
      progress !== this.state.progress ||
      scaleDestiny !== this.state.scaleDestiny;

    if (isUpdateSettings) {
      this.components = [];
      this.slider.innerHTML = '';
      this.createComponents(state);
      this.bindEventListener();
    }
  }

  private checkTips() {
    const { tip, range, horizontal } = this.state;

    if (!(tip && range)) {
      return;
    }

    const tips = this.getArrOfConcreteSubView(Tip);
    const size = horizontal
      ? tips[1].subView.clientHeight
      : tips[1].subView.offsetWidth;
    const firstPosition = tips[0].getPosition();
    const secondPosition = tips[1].getPosition() - size;

    if (firstPosition > secondPosition) {
      tips.forEach((t: any) => {
        t.changeIsDouble(true);
        t.setState(this.state);
      });
    } else {
      tips.forEach((t: any) => {
        t.changeIsDouble(false);
      });
    }
  }

  private update(state: Data) {
    this.components.forEach((component) => component.setState(state));
  }

  private getArrOfConcreteSubView(instance: Function): Array<SubView> {
    return this.components.filter(
      (component) => component instanceof instance ?? component,
    );
  }
}

export default View;
