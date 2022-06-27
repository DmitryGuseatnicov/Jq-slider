import EventCreator from '../EventCreator/EventCreator';
import { ModelEvent, ModelEventCallBack, State, Data } from '../../types/types';

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

    this.state = {
      ...this.state,
      ...this.minMaxValidator(settings),
    };
    this.state = {
      ...this.state,
      ...this.rangeFromToValidator(this.stepValidator(values)),
    };

    this.dispatchEvent('ModelEvent', this.state);
  }

  public getState(): State {
    return this.state;
  }

  private init(state: Data) {
    this.registerEvent('ModelEvent');
    this.setState(state);
  }

  private splitParams(data: Data): Array<Data> {
    const values: Data = {};
    const settings: Data = {};

    // eslint-disable-next-line no-unused-expressions
    'from' in data
      ? (values.from = data.from)
      : (values.from = this.state.from);

    // eslint-disable-next-line no-unused-expressions, prettier/prettier
    'to' in data
      ? (values.to = data.to) 
      : (values.to = this.state.to);

    if (data.step !== undefined && data.step > 0) settings.step = data.step;
    if (typeof data.min === 'number') settings.min = data.min;
    if (typeof data.max === 'number') settings.max = data.max;
    if (typeof data.scale === 'boolean') settings.scale = data.scale;
    if (typeof data.range === 'boolean') settings.range = data.range;
    if (typeof data.tip === 'boolean') settings.tip = data.tip;
    if (typeof data.progress === 'boolean') settings.progress = data.progress;
    if (typeof data.scaleDestiny === 'number')
      settings.scaleDestiny = data.scaleDestiny;
    if (typeof data.horizontal === 'boolean')
      settings.horizontal = data.horizontal;

    return [values, settings];
  }

  private minMaxValidator(data: Data): Data {
    let { min = this.state.min } = data;
    const { max = this.state.max } = data;

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

      if (copyOfData.from <= this.state.min) {
        copyOfData.from = this.state.min;
      } else if (copyOfData.from >= this.state.max) {
        copyOfData.from = this.state.max;
      }
    }

    if (typeof copyOfData.to === 'number') {
      copyOfData.to = checkStep(copyOfData.to, this.state.step);

      if (copyOfData.to <= this.state.min) {
        copyOfData.to = this.state.min;
      } else if (copyOfData.to >= this.state.max) {
        copyOfData.to = this.state.max;
      }
    }
    return copyOfData;
  }

  private rangeFromToValidator(data: Data): Data {
    if (!this.state.range) {
      return data;
    }

    const copyOfSData = { ...data };

    if (
      typeof copyOfSData.from === 'number' &&
      typeof copyOfSData.to === 'number'
    ) {
      const isFromNotValidly = this.state.to - copyOfSData.from <= 0;
      const isToNotValidly = copyOfSData.to - this.state.from <= 0;

      if (this.state.from > this.state.to) this.state.from = this.state.to;
      if (isFromNotValidly) copyOfSData.from = this.state.to;
      if (isToNotValidly) copyOfSData.to = this.state.from;
    }

    return copyOfSData;
  }
}

export default Model;
