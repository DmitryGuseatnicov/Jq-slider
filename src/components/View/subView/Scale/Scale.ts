import { State } from 'types/types';
import { convertPercentInValue, convertValueInPercent } from 'utils/calcUtils';

import SubView from '../baseClasses/abstractSubView/abstractSubView';

interface IScale {
  min: number;
  max: number;
  horizontal: boolean;
  scaleDestiny: number;
}

class Scale extends SubView<IScale> {
  constructor(slider: HTMLElement) {
    super(slider);
    this.init();
  }

  public setState(state: State): void {
    const { min, max, horizontal, scaleDestiny } = state;

    const oldState = JSON.stringify(this.state);

    this.state = {
      ...this.state,
      min,
      max,
      horizontal,
      scaleDestiny,
    };
    if (oldState !== JSON.stringify(this.state)) {
      this.update();
    }
  }

  public init(): void {
    this.createSubView();
    this.registerEvent('SubViewEvent');
  }

  public createSubView(): void {
    this.subView = document.createElement('div');
    this.subView.classList.add('jq-slider__scale');
    this.slider.appendChild(this.subView);
  }

  public update(): void {
    const { min, max, scaleDestiny } = this.state;

    let pips = this.createPipFragment(min, max, min);
    for (let pip = min + 1; pip < max; pip += 1) {
      if (pip % scaleDestiny === 0) {
        pips += this.createPipFragment(min, max, pip);
      }
    }
    pips += this.createPipFragment(min, max, max);

    this.subView.innerHTML = pips;
    this.bindEventListener();
  }

  private createPipFragment(min: number, max: number, value: number) {
    if (this.state.horizontal) {
      return `
      <div class="jq-slider__scale-pip" style="top:${convertPercentInValue(
        0,
        this.slider.clientHeight,
        convertValueInPercent(min, max, value),
      )}px">
        <div class="jq-slider__scale-label">${value}</div>
      </div>`;
    }
    return `
      <div class="jq-slider__scale-pip" style="left:${convertValueInPercent(
        min,
        max,
        value,
      )}%">
        <div class="jq-slider__scale-label">${value}</div>
      </div>`;
  }

  private bindEventListener() {
    this.clickHandler = this.clickHandler.bind(this);
    this.subView.querySelectorAll('.jq-slider__scale-label').forEach((pip) => {
      if (pip instanceof HTMLElement) {
        pip.addEventListener('click', this.clickHandler);
      }
    });
  }

  private clickHandler(e: MouseEvent) {
    const { min, max, horizontal } = this.state;

    const isCorrectParams =
      e.target instanceof HTMLElement &&
      typeof min === 'number' &&
      typeof max === 'number';

    if (!isCorrectParams) {
      return;
    }

    const onePercent = horizontal
      ? this.slider.clientHeight / 100
      : this.slider.clientWidth / 100;

    const percents = horizontal
      ? convertValueInPercent(min, max, +e.target.innerHTML)
      : convertValueInPercent(min, max, +e.target.innerHTML);

    let position = onePercent * percents;
    if (position === 0) {
      const sliderSize = horizontal
        ? this.slider.clientHeight
        : this.slider.clientWidth;
      position = this.getPosition() - sliderSize;
    }
    this.dispatchEvent('SubViewEvent', { target: 'scale', position });
  }
}

export default Scale;
