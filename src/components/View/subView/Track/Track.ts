import SubView from '../abstractSubView/abstractSubView';
import { convertValueInPercent } from '../../../../utils/calcUtils';
import { State } from '../../../../types/types';

class Track extends SubView {
  public subView!: HTMLElement;

  public progress!: HTMLElement;

  constructor(slider: HTMLElement) {
    super(slider);
    this.init();
  }

  public setState(state: State): void {
    const { min, max, from, to, horizontal, range, progress } = state;

    this.state = {
      ...this.state,
      min,
      max,
      from,
      to,
      horizontal,
      range,
      progress,
    };

    this.update();
  }

  protected createSubView(): void {
    this.subView = document.createElement('div');
    this.subView.classList.add('jq-slider__track');
    this.progress = document.createElement('div');
    this.progress.classList.add('jq-slider__progress');
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
    const { min, max, from, to, horizontal, range, progress } = this.state;

    if (!progress) {
      this.progress.remove();
      return;
    }

    const isNumbers =
      typeof min === 'number' &&
      typeof max === 'number' &&
      typeof from === 'number' &&
      typeof to === 'number';

    if (isNumbers) {
      const start = convertValueInPercent(min, max, from);
      const end = convertValueInPercent(min, max, to);
      if (horizontal) {
        if (range) {
          const height = end - start;
          const onePercent = this.slider.clientHeight / 100;

          this.progress.style.height = `${height}%`;
          this.progress.style.marginTop = `${onePercent * start}px`;
        } else {
          this.progress.style.height = `${start}%`;
        }
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
