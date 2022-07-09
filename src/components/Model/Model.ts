import {
  ModelEvent,
  ModelEventCallBack,
  State,
  Data,
  Values,
  Settings,
} from 'types/types';
import { convertPercentInValue, convertValueInPercent } from 'utils/calcUtils';

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

    if (data.step !== undefined && data.step > 0) settings.step = data.step;
    if (data.min !== undefined) settings.min = data.min;
    if (data.max !== undefined) settings.max = data.max;
    if (data.scale !== undefined) settings.scale = data.scale;
    if (data.range !== undefined) settings.range = data.range;
    if (data.tip !== undefined) settings.tip = data.tip;
    if (data.progress !== undefined) settings.progress = data.progress;
    if (data.horizontal !== undefined) settings.horizontal = data.horizontal;
    if (data.scaleDestiny !== undefined)
      settings.scaleDestiny = data.scaleDestiny <= 0 ? 1 : data.scaleDestiny;

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

    if (copyOfData.from !== undefined) {
      copyOfData.from = this.checkStep(copyOfData.from);

      if (copyOfData.from <= this.state.min) {
        copyOfData.from = this.state.min;
      } else if (copyOfData.from >= this.state.max) {
        copyOfData.from = this.state.max;
      }
    }

    if (copyOfData.to !== undefined) {
      copyOfData.to = this.checkStep(copyOfData.to);

      if (copyOfData.to <= this.state.min) {
        copyOfData.to = this.state.min;
      } else if (copyOfData.to >= this.state.max) {
        copyOfData.to = this.state.max;
      }
    }
    return copyOfData;
  }

  private checkStep(value: number): number {
    const { min, max, step } = this.state;

    const interval = max - min;
    const stepInPercent = 100 / (interval / step);
    const valueInPercent = convertValueInPercent(min, max, value);

    return +convertPercentInValue(
      min,
      max,
      Math.round(valueInPercent / stepInPercent) * stepInPercent,
    ).toFixed(2);
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
