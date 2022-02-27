/* eslint-disable no-mixed-operators */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { ISubView } from '../../../../interfaces/interfaces';
import { State, SubViewEvent, SubViewEventCallBack } from '../../../../types/types';
import { convertValueInPercent } from '../../../../utils/calcUtils';
import EventCreator from '../../../EventCreator/EventCreator';

const initialState: State = {
  min: 0,
  max: 100,
  from: 0,
  horizontal: false,
};

class Handle extends EventCreator<SubViewEvent, SubViewEventCallBack> implements ISubView {
  public slider: HTMLElement;

  private state: State;

  public subView: HTMLElement;

  constructor(slider: HTMLElement) {
    super();
    this.slider = slider;
    this.subView = slider;
    this.state = initialState;
    this.init();
  }

  public setState(state: State) {
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

  private init() {
    this.createHandle();
    this.registerEvent('SubViewEvent');
    this.bindEventListener();
  }

  private createHandle(): void {
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

  private pointerHandler(e: PointerEvent): void {
    this.dispatchEvent('SubViewEvent', {
      target: 'handle',
      position: this.state.horizontal
        ? e.clientY - this.slider.getBoundingClientRect().top
        : e.clientX - this.slider.getBoundingClientRect().left,
    });
  }

  private update(): void {
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
