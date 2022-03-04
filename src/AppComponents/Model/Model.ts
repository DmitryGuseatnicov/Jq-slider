/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  ModelEvent, ModelEventCallBack, State, Data,
} from '../../types/types';
import EventCreator from '../EventCreator/EventCreator';

class Model extends EventCreator<ModelEvent, ModelEventCallBack> {
  private state: State;

  constructor(state: State) {
    super();
    this.state = {
      min: 0,
      max: 100,
      from: 0,
      to: 100,
      step: 1,
      tip: true,
      range: true,
      progress: true,
      scale: true,
      horizontal: false,
    };
    this.init(state);
  }

  public setState(state: Data) {
    const [values, settings] = this.splitParams(state);
    this.state = { ...this.state, ...settings };
    this.state = { ...this.state, ...this.rangeFromToValidator(this.stepValidator(values)) };
    this.dispatchEvent('ModelEvent', this.state);
  }

  public getState(): State {
    return this.state;
  }

  private init(state: State) {
    this.registerEvent('ModelEvent');
    this.setState(state);
  }

  // eslint-disable-next-line class-methods-use-this
  private splitParams(data: Data): Array<Data> {
    const values: Data = {};
    const settings: Data = {};
    if ('from' in data) values.from = data.from;
    if ('to' in data) values.to = data.to;

    if ('step' in data) settings.step = data.step;
    if ('min' in data) settings.min = data.min;
    if ('max' in data) settings.max = data.max;
    if ('range' in data) settings.range = data.range;
    if ('tip' in data) settings.tip = data.tip;
    if ('horizontal' in data) settings.horizontal = data.horizontal;
    if ('progress' in data) settings.progress = data.progress;

    return [values, settings];
  }

  private stepValidator(data: Data): Data {
    const copyOfData = { ...data };

    function checkStep(value: number, step: number): number {
      return +(Math.round(value / step) * step).toFixed(2);
    }

    if (copyOfData.from) {
      if (copyOfData.from <= this.state.min) copyOfData.from = this.state.min;
      else if (copyOfData.from >= this.state.max) copyOfData.from = this.state.max;
      else copyOfData.from = checkStep(copyOfData.from, this.state.step);
    }

    if (copyOfData.to) {
      if (copyOfData.to <= this.state.min) copyOfData.to = this.state.min;
      else if (copyOfData.to >= this.state.max) copyOfData.to = this.state.max;
      else copyOfData.to = checkStep(copyOfData.to, this.state.step);
    }

    return copyOfData;
  }

  private rangeFromToValidator(data: Data): Data {
    if (!this.state.range) {
      return data;
    }

    const copyOfSData = { ...data };
    const isFromNotValidly = copyOfSData.from && this.state.to - copyOfSData.from <= 0;
    const isToNotValidly = copyOfSData.to && copyOfSData.to - this.state.from <= 0;

    if (isFromNotValidly) copyOfSData.from = this.state.to;
    if (isToNotValidly) copyOfSData.to = this.state.from;

    return copyOfSData;
  }
}

export default Model;
