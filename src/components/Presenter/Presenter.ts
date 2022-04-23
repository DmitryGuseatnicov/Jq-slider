import Model from '../Model/Model';
import View from '../View/View';
import EventCreator from '../EventCreator/EventCreator';
import { Data, State, ViewEvent } from '../../types/types';
import { convertPercentInValue } from '../../utils/calcUtils';

class Presenter extends EventCreator<State, State> {
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
    this.dispatchEvent('onChange', e);
    this.view.setState(e);
  }
}

export default Presenter;