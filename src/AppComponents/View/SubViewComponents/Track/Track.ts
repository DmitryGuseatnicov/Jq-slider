/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { State } from '../../../../types/types';
import { convertValueInPercent } from '../../../../utils/calcUtils';
import SubView from '../../abstractSubView/abstractSubView';

class Track extends SubView {
  public subView!: HTMLElement;

  public progress!: HTMLElement;

  constructor(slider: HTMLElement) {
    super(slider);
    this.init();
  }

  public setState(state: State): void {
    const {
      min, max, from, to, horizontal, range,
    } = state;

    this.state = {
      ...this.state, min, max, from, to, horizontal, range,
    };

    this.update();
  }

  protected createSubView(): void {
    this.subView = document.createElement('div');
    this.progress = document.createElement('div');
    this.progress.classList.add('jq-slider__progress');
    this.subView.classList.add('jq-slider__track');
    this.subView.appendChild(this.progress);
    this.slider.appendChild(this.subView);
  }

  protected init(): void {
    this.createSubView();
    this.registerEvent('SubViewEvent');
    this.bindEventListener();
  }

  private bindEventListener() {
    this.clickHandler = this.clickHandler.bind(this);
    this.subView.addEventListener('click', this.clickHandler);
  }

  private clickHandler(e: MouseEvent) {
    this.dispatchEvent('SubViewEvent', {
      target: 'track',
      position: this.state.horizontal
        ? e.clientY - this.slider.getBoundingClientRect().top
        : e.clientX - this.slider.getBoundingClientRect().left,
    });
  }

  protected update(): void {
    const {
      min, max, from, to, horizontal, range,
    } = this.state;

    const isNumbers = typeof min === 'number' && typeof max === 'number'
                      && typeof from === 'number' && typeof to === 'number';

    if (isNumbers) {
      const start = convertValueInPercent(min, max, from);
      const end = convertValueInPercent(min, max, to);
      if (horizontal) {
        const height = end - start;
        this.progress.style.height = `${height}%`;
        this.progress.style.marginTop = `${start}%`;
        return;
      }
      if (range) {
        const width = end - start;
        this.progress.style.width = `${width}%`;
        this.progress.style.marginLeft = `${start}%`;
      } else {
        this.progress.style.width = `${start}%`;
      }
    }
  }
}

export default Track;
