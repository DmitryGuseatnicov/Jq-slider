/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Data, State, ViewEvent } from '../../types/types';
import { convertPercentInValue } from '../../utils/calcUtils';
import EventCreator from '../EventCreator/EventCreator';
import Model from '../Model/Model';
import View from '../View/View';

class Presenter extends EventCreator<State, any> {
  public model: Model;

  private view: View;

  constructor(nodeElem: HTMLElement, state: Data) {
    super();
    this.view = new View(nodeElem);
    this.model = new Model(state);
    this.init();
  }

  private init() {
    this.view.setState(this.model.getState());
    this.bindEventListeners();
  }

  private bindEventListeners() {
    this.viewEventHandler = this.viewEventHandler.bind(this);
    this.modelEventHandler = this.modelEventHandler.bind(this);
    this.view.addEventListener('ViewEvent', this.viewEventHandler);
    this.model.addEventListener('ModelEvent', this.modelEventHandler);
  }

  private viewEventHandler(e: ViewEvent) {
    const { min, max } = this.model.getState();
    if (typeof min === 'number' && typeof max === 'number') {
      if (e.from) e.from = +convertPercentInValue(min, max, e.from).toFixed(3);
      if (e.to) e.to = +convertPercentInValue(min, max, e.to).toFixed(3);
    }
    this.model.setState(e);
  }

  private modelEventHandler(e: State) {
    this.view.setState(e);
  }
}

export default Presenter;
