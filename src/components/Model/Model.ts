import EventCreator from '../EventCreator/EventCreator';
import {
  ModelEvent,
  ModelEventCallBack,
  State,
  Data,
  Values,
  Settings,
} from '../../types/types';

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
    const values: Values = {};
    const settings: Settings = {};

    // eslint-disable-next-line no-unused-expressions
    'from' in data
      ? (values.from = data.from)
      : (values.from = this.state.from);

    // eslint-disable-next-line no-unused-expressions, prettier/prettier
    'to' in data
      ? (values.to = data.to) 
      : (values.to = this.state.to);

    

    if (data.step !== undefined && data.step > 0) settings.step = data.step;
    if (data.min !== undefined) settings.min = data.min;
    if (data.max !== undefined) settings.max = data.max;
    if (data.scale !== undefined) settings.scale = data.scale;
    if (data.range !== undefined) settings.range = data.range;
    if (data.tip !== undefined) settings.tip = data.tip;
    if (data.progress !== undefined) settings.progress = data.progress;
    if (data.horizontal !== undefined) settings.horizontal = data.horizontal;
    if (data.scaleDestiny !== undefined)
      settings.scaleDestiny = data.scaleDestiny;

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

    if (copyOfData.from !== undefined) {
      copyOfData.from = checkStep(copyOfData.from, this.state.step);

      if (copyOfData.from <= this.state.min) {
        copyOfData.from = this.state.min;
      } else if (copyOfData.from >= this.state.max) {
        copyOfData.from = this.state.max;
      }
    }

    if (copyOfData.to !== undefined) {
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

    if (copyOfSData.from !== undefined && copyOfSData.to !== undefined) {
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
