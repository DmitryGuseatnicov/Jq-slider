/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line max-classes-per-file
import Handle from './SubViewComponents/Handle/Handle';
import EventCreator from '../EventCreator/EventCreator';

import {
  SubViewEvent, Data, ViewEvent, ViewEventCallBack,
} from '../../types/types';
import SubView from './abstractSubView/abstractSubView';
import SecondHandle from './SubViewComponents/Handle/SecondHandle';
import Tip from './SubViewComponents/Tip/Tip';
import SecondTip from './SubViewComponents/Tip/SecondTip';

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
    const { range, tip } = state;
    this.components.push(new Handle(this.slider));
    if (range) {
      this.components.push(new SecondHandle(this.slider));
      if (tip) {
        this.components.push(new SecondTip(this.slider));
      }
    }
    if (tip) {
      this.components.push(new Tip(this.slider));
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
    if (e.target === 'handle') {
      this.dispatchEvent('ViewEvent', { from: e.position });
    }

    if (e.target === 'secondHandle') {
      this.dispatchEvent('ViewEvent', { to: e.position });
    }
  }

  private checkSettings(state: Data) {
    const {
      range, tip, scale, horizontal,
    } = state;
    const isUpdateSettings = range !== this.state.range || tip !== this.state.tip
                            || scale !== this.state.scale || horizontal !== this.state.horizontal;
    if (isUpdateSettings) {
      this.components.forEach((component) => component.subView.remove());
      this.createComponents(state);
      this.bindEventListener();
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
