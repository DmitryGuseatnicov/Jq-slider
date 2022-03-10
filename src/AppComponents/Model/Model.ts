/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  ModelEvent, ModelEventCallBack, State, Data,
} from '../../types/types';
import EventCreator from '../EventCreator/EventCreator';

class Model extends EventCreator<ModelEvent, ModelEventCallBack> {
  private state: State;

  constructor(state: Data) {
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
      scaleDestiny: 10,
      horizontal: false,
    };
    this.init(state);
  }

  public setState(state: Data) {
    const [values, settings] = this.splitParams(state);
    this.state = { ...this.state, ...this.checkMinMax(settings) };
    this.state = { ...this.state, ...this.rangeFromToValidator(this.stepValidator(values)) };
    this.dispatchEvent('ModelEvent', this.state);
  }

  public getState(): State {
    return this.state;
  }

  private init(state: Data) {
    this.registerEvent('ModelEvent');
    this.setState(state);
  }

  // eslint-disable-next-line class-methods-use-this
  private splitParams(data: Data): Array<Data> {
    const values: Data = {};
    const settings: Data = {};

    if ('from' in data) {
      values.from = data.from;
    } else {
      values.from = this.state.from;
    }

    if ('to' in data) {
      values.to = data.to;
    } else {
      values.to = this.state.to;
    }

    if ('step' in data && data.step! > 0) settings.step = data.step;
    if ('min' in data) settings.min = data.min;
    if ('max' in data) settings.max = data.max;
    if ('scaleDestiny' in data) settings.scaleDestiny = data.scaleDestiny;
    if ('scale' in data) settings.scale = data.scale;
    if ('range' in data) settings.range = data.range;
    if ('tip' in data) settings.tip = data.tip;
    if ('horizontal' in data) settings.horizontal = data.horizontal;
    if ('progress' in data) settings.progress = data.progress;

    return [values, settings];
  }

  private checkMinMax(data: Data): Data {
    // eslint-disable-next-line prefer-const
    let { min = this.state.min, max = this.state.max } = data;

    if (min > max) min = max;

    return { ...data, min, max };
  }

  private stepValidator(data: Data): Data {
    const copyOfData = { ...data };

    function checkStep(value: number, step: number): number {
      return +(Math.round(value / step) * step).toFixed(2);
    }

    if (typeof copyOfData.from === 'number') {
      copyOfData.from = checkStep(copyOfData.from, this.state.step);
      if (copyOfData.from <= this.state.min) copyOfData.from = this.state.min;
      else if (copyOfData.from >= this.state.max) copyOfData.from = this.state.max;
    }

    if (typeof copyOfData.to === 'number') {
      copyOfData.to = checkStep(copyOfData.to, this.state.step);
      if (copyOfData.to <= this.state.min) copyOfData.to = this.state.min;
      else if (copyOfData.to >= this.state.max) copyOfData.to = this.state.max;
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

    if (this.state.from > this.state.to) this.state.from = this.state.to;
    if (isFromNotValidly) copyOfSData.from = this.state.to;
    if (isToNotValidly) copyOfSData.to = this.state.from;

    return copyOfSData;
  }
}

export default Model;
