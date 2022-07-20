import { convertValueInPercent } from 'utils/calcUtils';

import SubView from '../baseClasses/abstractSubView/abstractSubView';

class Track extends SubView {
  public progress!: HTMLElement;

  constructor(slider: HTMLElement) {
    super(slider);
    this.init();
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

  protected update(): void {
    const { min, max, from, to, horizontal, range, progress } = this.state;

    if (!progress) {
      this.progress.remove();
      return;
    }

    const start = convertValueInPercent(min, max, from);
    const end = convertValueInPercent(min, max, to);

    if (horizontal && range) {
      const height = end - start;
      const onePercent = this.slider.clientHeight / 100;
      this.progress.style.height = `${height}%`;
      this.progress.style.marginTop = `${onePercent * start}px`;
      return;
    }

    if (horizontal && !range) {
      this.progress.style.height = `${start}%`;
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

  private bindEventListener() {
    this.handleTrackClick = this.handleTrackClick.bind(this);
    this.subView.addEventListener('click', this.handleTrackClick);
  }

  private handleTrackClick(e: MouseEvent) {
    this.dispatchEvent('SubViewEvent', {
      target: 'track',
      position: this.state.horizontal
        ? e.clientY - this.slider.getBoundingClientRect().top
        : e.clientX - this.slider.getBoundingClientRect().left,
    });
  }
}

export default Track;
