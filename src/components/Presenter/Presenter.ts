import { Data, State, ViewEvent } from 'types/types';
import { convertPercentInValue } from 'utils/calcUtils';

import Model from '../Model/Model';
import View from '../View/View';
import EventCreator from '../EventCreator/EventCreator';

// eslint-disable-next-line no-unused-vars
class Presenter extends EventCreator<State, (state: State) => void> {
  public model: Model;

  private view: View;

  constructor(nodeElem: HTMLElement, state: Data) {
    super();
    this.view = new View(nodeElem);
    this.model = new Model(state);
    this.registerEvent('onChange');
    this.init();
  }

  private init() {
    this.view.setState(this.model.getState());
    this.bindEventListeners();
  }

  private bindEventListeners() {
    this.handleViewEvent = this.handleViewEvent.bind(this);
    this.handleModelEvent = this.handleModelEvent.bind(this);
    this.view.addEventListener('ViewEvent', this.handleViewEvent);
    this.model.addEventListener('ModelEvent', this.handleModelEvent);
  }

  private handleViewEvent(e: ViewEvent) {
    const { min, max } = this.model.getState();
    const isNumbers = typeof min === 'number' && typeof max === 'number';

    if (!isNumbers) return;
    if (e.from) e.from = +convertPercentInValue(min, max, e.from).toFixed(3);
    if (e.to) e.to = +convertPercentInValue(min, max, e.to).toFixed(3);

    this.model.setState(e);
  }

  private handleModelEvent(e: State) {
    this.dispatchEvent('onChange', e);
    this.view.setState(e);
  }
}

export default Presenter;
