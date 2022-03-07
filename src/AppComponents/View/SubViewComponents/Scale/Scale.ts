/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Data } from '../../../../types/types';
import { convertValueInPercent } from '../../../../utils/calcUtils';
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
      let pips = '';

      pips += `
        <div class="jq-slider__scale-pip" style="left:${convertValueInPercent(min, max, min)}%">
          <div class="jq-slider__scale-label">${min}</div>
        </div>`;

      for (let pip = min + step; pip < max; pip += step) {
        if (pip % scaleDestiny === 0) {
          pips += `
            <div class="jq-slider__scale-pip" style="left:${convertValueInPercent(min, max, pip)}%">
              <div class="jq-slider__scale-label">${pip}</div>
            </div>`;
        }
      }

      pips += `
        <div class="jq-slider__scale-pip" style="left:${convertValueInPercent(min, max, max)}%">
          <div class="jq-slider__scale-label">${max}</div>
        </div>`;

      this.subView.innerHTML = pips;
      this.bindEventListener();
    }
  }

  private bindEventListener() {
    this.clickHandler = this.clickHandler.bind(this);
    this.subView.querySelectorAll('.jq-slider__scale-pip').forEach((pip) => {
      if (pip instanceof HTMLElement) {
        pip.addEventListener('click', this.clickHandler);
      }
    });
  }

  private clickHandler(e: MouseEvent) {
    this.dispatchEvent('SubViewEvent', {
      target: 'track',
      position: this.state.horizontal
        ? e.clientY - this.slider.getBoundingClientRect().top
        : e.clientX - this.slider.getBoundingClientRect().left,
    });
  }
}

export default Scale;
