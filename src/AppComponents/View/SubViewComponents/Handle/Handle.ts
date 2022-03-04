/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { Data } from '../../../../types/types';
import { convertPixelInPercent, convertValueInPercent } from '../../../../utils/calcUtils';
import SubView from '../../abstractSubView/abstractSubView';

class Handle extends SubView {
  public slider: HTMLElement;

  public subView!: HTMLElement;

  protected state: Data;

  constructor(slider: HTMLElement) {
    super(slider);
    this.slider = slider;
    this.state = {};
    this.init();
  }

  public setState(state: Data): void {
    const {
      min = this.state.min,
      max = this.state.max,
      from = this.state.from,
      horizontal = this.state.horizontal,
    } = state;

    this.state = {
      ...this.state, min, max, from, horizontal,
    };

    this.update();
  }

  public getPosition(): number {
    if (this.state.horizontal) {
      const subViewTop = this.subView.getBoundingClientRect().top;
      const sliderTop = this.slider.getBoundingClientRect().top;
      return subViewTop - sliderTop + this.subView.offsetHeight / 2;
    }

    const subViewLeft = this.subView.getBoundingClientRect().left;
    const sliderLeft = this.slider.getBoundingClientRect().left;
    return subViewLeft - sliderLeft + this.subView.offsetWidth / 2;
  }

  protected init() {
    this.createSubView();
    this.registerEvent('SubViewEvent');
    this.bindEventListener();
  }

  public createSubView(): void {
    this.subView = document.createElement('div');
    this.subView.classList.add('jq-slider__handle');
    this.slider.appendChild(this.subView);
  }

  private bindEventListener(): void {
    this.pointerStart = this.pointerStart.bind(this);
    this.subView.addEventListener('pointerdown', this.pointerStart);
  }

  private pointerStart(): void {
    this.pointerHandler = this.pointerHandler.bind(this);
    window.addEventListener('pointermove', this.pointerHandler);
    window.addEventListener('pointerup', () => {
      window.removeEventListener('pointermove', this.pointerHandler);
      window.removeEventListener('pointermove', this.pointerHandler);
    });
  }

  protected pointerHandler(e: PointerEvent): void {
    this.dispatchEvent('SubViewEvent', {
      target: 'handle',
      position: this.state.horizontal
        ? convertPixelInPercent(this.slider.clientHeight, e.clientY - this.slider.getBoundingClientRect().top)
        : convertPixelInPercent(this.slider.clientWidth, e.clientX - this.slider.getBoundingClientRect().left),
    });
  }

  protected update(): void {
    const {
      min, max, from, horizontal,
    } = this.state;

    const isNumbers = typeof min === 'number' && typeof max === 'number' && typeof from === 'number';
    if (isNumbers) {
      if (horizontal) {
        this.subView.style.top = `${convertValueInPercent(min, max, from)}%`;
        return;
      }
      this.subView.style.left = `${convertValueInPercent(min, max, from)}%`;
    }
  }
}

export default Handle;
