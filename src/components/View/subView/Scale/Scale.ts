import { State } from 'types/types';
import { convertPercentInValue, convertValueInPercent } from 'utils/calcUtils';

import SubView from '../baseClasses/abstractSubView/abstractSubView';

class Scale extends SubView {
  constructor(slider: HTMLElement) {
    super(slider);
    this.init();
  }

  public setState(state: State): void {
    const scaleStetting: Array<keyof State> = [
      'min',
      'max',
      'horizontal',
      'scaleDestiny',
      'step',
    ];

    const isChangedScaleSettings = scaleStetting.reduce((flag, key) => {
      if (state[key] !== this.state[key]) {
        return true;
      }
      return flag;
    }, false);

    if (isChangedScaleSettings) {
      super.setState(state);
    }
  }

  public init(): void {
    this.createSubView();
    this.registerEvent('SubViewEvent');
  }

  public visibilitySwitcher(
    positionInScale: 'first' | 'last',
    visible: boolean,
  ) {
    const pips = this.subView.querySelectorAll('.jq-slider__scale-label');
    if (positionInScale === 'first' && pips[0] instanceof HTMLElement) {
      // eslint-disable-next-line no-unused-expressions
      visible
        ? pips[0].classList.add('js-slider__scale-label_hidden')
        : pips[0].classList.remove('js-slider__scale-label_hidden');
    }

    const numberOfLastPip = pips.length - 1;
    if (
      positionInScale === 'last' &&
      pips[numberOfLastPip] instanceof HTMLElement
    ) {
      // eslint-disable-next-line no-unused-expressions
      visible
        ? pips[numberOfLastPip].classList.add('js-slider__scale-label_hidden')
        : pips[numberOfLastPip].classList.remove(
            'js-slider__scale-label_hidden',
          );
    }
  }

  protected createSubView(): void {
    this.subView = document.createElement('div');
    this.subView.classList.add('jq-slider__scale');
    this.slider.appendChild(this.subView);
  }

  protected update(): void {
    const { min, max, step, horizontal, scaleDestiny } = this.state;

    let pips = [];

    for (let pip = min; pip < max; pip += step < 1 ? 1 : step) {
      pips.push(this.createPipFragment(min, max, pip));
    }

    const maxSymbolsInPip =
      Math.abs(min) > Math.abs(max)
        ? min.toString().length
        : max.toString().length;

    const sizeOfPip = horizontal
      ? this.slider.getBoundingClientRect().height / 20
      : this.slider.getBoundingClientRect().width / (maxSymbolsInPip * 10);

    if (pips.length > sizeOfPip) {
      pips = pips.filter(
        (_pip, i) => i % Math.round(pips.length / sizeOfPip) === 0,
      );
    }
    pips = pips.filter((_pip, i) => i % scaleDestiny === 0);

    pips.push(this.createPipFragment(min, max, max));

    this.subView.innerHTML = pips.join(' ');

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
        <div class="jq-slider__scale-label">${value.toFixed(0)}</div>
      </div>`;
    }
    return `
      <div class="jq-slider__scale-pip" style="left:${convertValueInPercent(
        min,
        max,
        value,
      )}%">
        <div class="jq-slider__scale-label">${value.toFixed(0)}</div>
      </div>`;
  }

  private bindEventListener() {
    this.handleScaleLabelCLick = this.handleScaleLabelCLick.bind(this);
    this.subView.querySelectorAll('.jq-slider__scale-label').forEach((pip) => {
      if (pip instanceof HTMLElement) {
        pip.addEventListener('click', this.handleScaleLabelCLick);
      }
    });
  }

  private handleScaleLabelCLick(e: MouseEvent) {
    const { min, max, horizontal } = this.state;

    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    const onePercent = horizontal
      ? this.slider.getBoundingClientRect().height / 100
      : this.slider.getBoundingClientRect().width / 100;

    const percents = horizontal
      ? convertValueInPercent(min, max, +e.target.innerHTML)
      : convertValueInPercent(min, max, +e.target.innerHTML);

    let position = onePercent * percents;
    if (position === 0) {
      const sliderSize = horizontal
        ? this.slider.getBoundingClientRect().height
        : this.slider.getBoundingClientRect().width;
      position = this.getPosition() - sliderSize;
    }
    this.dispatchEvent('SubViewEvent', { target: 'scale', position });
  }
}

export default Scale;
