import { Data, State, ViewEvent } from 'types/types';

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
    this.handleModelUpdateValues = this.handleModelUpdateValues.bind(this);
    this.handleModelUpdateSettings = this.handleModelUpdateSettings.bind(this);

    this.view.addEventListener('updateView', this.handleViewEvent);
    this.model.addEventListener('updateValues', this.handleModelUpdateValues);
    this.model.addEventListener(
      'updateSettings',
      this.handleModelUpdateSettings,
    );
  }

  private handleViewEvent(e: ViewEvent) {
    this.model.setState(e);
  }

  private handleModelUpdateValues(e: State) {
    this.dispatchEvent('onChange', e);
    this.view.setState(e);
  }

  private handleModelUpdateSettings(e: State) {
    this.dispatchEvent('onChange', e);
    this.view.rebuildSlider(e);
  }
}

export default Presenter;
