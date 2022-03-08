/* eslint-disable no-mixed-operators */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Handle from './SubViewComponents/Handle/Handle';
import EventCreator from '../EventCreator/EventCreator';

import {
  SubViewEvent, Data, ViewEvent, ViewEventCallBack,
} from '../../types/types';
import SubView from './abstractSubView/abstractSubView';
import SecondHandle from './SubViewComponents/Handle/SecondHandle';
import Tip from './SubViewComponents/Tip/Tip';
import SecondTip from './SubViewComponents/Tip/SecondTip';
import Track from './SubViewComponents/Track/Track';
import { convertPixelInPercent } from '../../utils/calcUtils';
import Scale from './SubViewComponents/Scale/Scale';

class View extends EventCreator<ViewEvent, ViewEventCallBack> {
  public nodeElem: HTMLElement;

  public slider!: HTMLElement;

  private state: Data;

  private components: Array<SubView>;

  constructor(nodeElem: HTMLElement) {
    super();
    this.nodeElem = nodeElem;
    this.components = [];
    this.state = {};
    this.init();
  }

  setState(state: Data) {
    this.checkSettings(state);
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
    const {
      range, tip, progress, scale, horizontal,
    } = state;

    if (horizontal) {
      this.slider.classList.add('jq-slider--horizontal');
    }

    this.components.push(new Handle(this.slider));

    if (tip) {
      this.components.push(new Tip(this.slider));
    }

    if (range) {
      this.components.push(new SecondHandle(this.slider));
      if (tip) {
        this.components.push(new SecondTip(this.slider));
      }
    }
    if (progress) {
      this.components.push(new Track(this.slider));
    }

    if (scale) {
      this.components.push(new Scale(this.slider));
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
    const size = this.state.horizontal ? this.slider.clientHeight : this.slider.clientWidth;

    if (e.target === 'handle') {
      const from = convertPixelInPercent(size, e.position);
      this.dispatchEvent('ViewEvent', { from });
    }

    if (e.target === 'secondHandle') {
      const to = convertPixelInPercent(size, e.position);
      this.dispatchEvent('ViewEvent', { to });
    }

    if (e.target === 'track' || e.target === 'scale') {
      const handles = this.getArrOfConcreteSubView(Handle);

      const from = handles[0].getPosition();
      if (this.state.range) {
        const to = handles[1].getPosition();

        if (Math.abs(from - e.position) < to - e.position) {
          this.dispatchEvent('ViewEvent', { from: convertPixelInPercent(size, e.position) });
          return;
        }
        this.dispatchEvent('ViewEvent', { to: convertPixelInPercent(size, e.position) });
        return;
      }
      this.dispatchEvent('ViewEvent', { from: convertPixelInPercent(size, e.position) });
    }
  }

  private checkSettings(state: Data) {
    const {
      range, tip, scale, horizontal, progress, scaleDestiny,
    } = state;

    const isUpdateSettings = range !== this.state.range || tip !== this.state.tip
                  || scale !== this.state.scale || horizontal !== this.state.horizontal
                  || progress !== this.state.progress || scaleDestiny !== this.state.scaleDestiny;

    if (isUpdateSettings) {
      this.components = [];
      this.slider.innerHTML = '';
      this.createComponents(state);
      this.bindEventListener();
    }
  }

  private checkTips() {
    const { tip, range } = this.state;
    if (tip && range) {
      const tips = this.getArrOfConcreteSubView(Tip);
      const firstPosition = tips[0].getPosition();
      const secondPosition = tips[1].getPosition() - tips[1].subView.clientWidth;
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
  }

  private update(state: Data) {
    this.components.forEach((component) => component.setState(state));
  }

  private getArrOfConcreteSubView(instance: Function): Array<SubView> {
    return this.components.filter((component) => component instanceof instance ?? component);
  }
}

export default View;
