/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line max-classes-per-file
import Handle from './SubViewComponents/Handle/Handle';
import EventCreator from '../EventCreator/EventCreator';

import {
  State, SubViewEvent, ViewEvent, ViewEventCallBack,
} from '../../types/types';
import SubView from './abstractSubView/abstractSubView';
import SecondHandel from './SubViewComponents/Handle/SecondHandle';
import Tip from './SubViewComponents/Tip/Tip';
import SecondTip from './SubViewComponents/Tip/SecondTip';

class View extends EventCreator<ViewEvent, ViewEventCallBack> {
  public nodeElem: HTMLElement;

  public slider!: HTMLElement;

  private state: State;

  private components: Array<SubView>;

  constructor(nodeElem: HTMLElement) {
    super();
    this.nodeElem = nodeElem;
    this.components = [];
    this.state = {};
    this.init();
  }

  setState(state: State) {
    this.state = { ...this.state, ...state };
    this.update(this.state);
  }

  private init() {
    this.createSlider();
    this.createComponents();
    this.bindEventListener();
    this.registerEvent('ViewEvent');
  }

  private createSlider() {
    this.slider = document.createElement('div');
    this.slider.classList.add('jq-slider');
    this.nodeElem.appendChild(this.slider);
  }

  private createComponents() {
    this.components.push(new Handle(this.slider));
    this.components.push(new SecondHandel(this.slider));
    this.components.push(new Tip(this.slider));
    this.components.push(new SecondTip(this.slider));
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

  private update(state: State) {
    this.components.forEach((component) => component.setState(state));
  }

  private getArrOfConcreteSubView(instance: Function): Array<SubView> {
    return this.components.filter((component) => component instanceof instance ?? component);
  }
}

export default View;
