/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Data } from '../../../../types/types';
import { convertValueInPercent } from '../../../../utils/calcUtils';
import SubView from '../../abstractSubView/abstractSubView';

class Tip extends SubView {
  public subView!: HTMLElement;

  protected state: Data;

  constructor(slider: HTMLElement) {
    super(slider);
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
      min, max, from, horizontal,
    };

    this.update();
  }

  protected init(): void {
    this.createSubView();
  }

  protected createSubView(): void {
    this.subView = document.createElement('div');
    this.subView.classList.add('jq-slider__tip');
    this.slider.appendChild(this.subView);
  }

  protected update(): void {
    const {
      min, max, from, horizontal,
    } = this.state;

    const isNumbers = typeof min === 'number' && typeof max === 'number' && typeof from === 'number';

    if (isNumbers) {
      this.subView.textContent = from.toString();
      if (horizontal) {
        this.subView.style.top = `${convertValueInPercent(min, max, from)}%`;
        return;
      }
      this.subView.style.left = `${convertValueInPercent(min, max, from)}%`;
    }
  }
}

export default Tip;
