/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line max-classes-per-file
import Handle from './SubViewComponents/Handle/Handle';
import EventCreator from '../EventCreator/EventCreator';

import { ISubView } from '../../interfaces/interfaces';
import {
  State, SubViewEvent, ViewEvent, ViewEventCallBack,
} from '../../types/types';

class View extends EventCreator<ViewEvent, ViewEventCallBack> {
  private nodeElem: HTMLElement;

  private state: State;

  private components: Array<ISubView>;

  public slider!: HTMLElement;

  constructor(nodeElem: HTMLElement) {
    super();
    this.nodeElem = nodeElem;
    this.components = [];
    this.state = {};
    this.init();
  }

  init() {
    this.createSlider();
    this.createComponents();
    this.bindEventListener();
  }

  createSlider() {
    this.slider = document.createElement('div');
    this.slider.classList.add('jq-slider');
    this.nodeElem.appendChild(this.slider);
  }

  createComponents() {
    this.components.push(new Handle(this.slider));
  }

  bindEventListener() {
    this.components.forEach((component) => component.addEventListener('SubViewEvent', this.subViewEventHandler));
  }

  subViewEventHandler(e: SubViewEvent) {
    console.log(e)
  }

  update(state: State) {
    this.components.forEach((component) => component.setState(state));
  }

  getArrOfConcreteSubView(instance: Function): Array<ISubView> {
    return this.components.filter((component) => component instanceof instance ?? component);
  }
}

export default View;
