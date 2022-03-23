/* eslint-disable no-mixed-operators */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Data } from '../../../../types/types';
import { convertPercentInValue, convertValueInPercent } from '../../../../utils/calcUtils';
import SubView from '../../abstractSubView/abstractSubView';

class Scale extends SubView {
  constructor(slider: HTMLElement) {
    super(slider);
    this.init();
  }

  public setState(state: Data): void {
    const {
      min, max, step, horizontal, scaleDestiny,
    } = state;

    const oldState = JSON.stringify(this.state);

    this.state = {
      ...this.state, min, max, step, horizontal, scaleDestiny,
    };
    if (oldState !== JSON.stringify(this.state)) {
      this.update();
    }
  }

  protected init(): void {
    this.createSubView();
    this.registerEvent('SubViewEvent');
  }

  protected createSubView(): void {
    this.subView = document.createElement('div');
    this.subView.classList.add('jq-slider__scale');
    this.slider.appendChild(this.subView);
  }

  protected update(): void {
    const {
      min, max, step, horizontal, scaleDestiny,
    } = this.state;

    const isCorrectParams = typeof min === 'number' && typeof max === 'number' && typeof scaleDestiny === 'number'
                            && typeof step === 'number' && typeof horizontal === 'boolean';

    if (isCorrectParams) {
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
  }

  private createPipFragment(min: number, max: number, value: number) {
    if (this.state.horizontal) {
      return `
      <div class="jq-slider__scale-pip" style="top:${convertPercentInValue(0, this.slider.clientHeight, convertValueInPercent(min, max, value))}px">
        <div class="jq-slider__scale-label">${value}</div>
      </div>`;
    }
    return `
      <div class="jq-slider__scale-pip" style="left:${convertValueInPercent(min, max, value)}%">
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
    if (e.target instanceof HTMLElement) {
      const { min, max } = this.state;

      if (typeof min === 'number' && typeof max === 'number') {
        const position = this.state.horizontal
          ? this.slider.clientHeight / 100 * convertValueInPercent(min!, max!, +e.target.innerHTML)
          : this.slider.clientWidth / 100 * convertValueInPercent(min!, max!, +e.target.innerHTML);
        this.dispatchEvent('SubViewEvent', { target: 'track', position });
      }
    }
  }
}

export default Scale;
