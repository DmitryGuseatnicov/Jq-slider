/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { State } from '../../../../types/types';
import { convertValueInPercent } from '../../../../utils/calcUtils';
import SubView from '../../abstractSubView/abstractSubView';

class Tip extends SubView {
  public subView!: HTMLElement;

  public isDouble: boolean;

  constructor(slider: HTMLElement) {
    super(slider);
    this.isDouble = false;
    this.init();
  }

  public setState(state: State): void {
    const {
      min, max, from, to, horizontal,
    } = state;

    this.state = {
      min, max, from, to, horizontal,
    };

    this.update();
  }

  public changeIsDouble(val: boolean) {
    this.isDouble = val;
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
      min, max, from, horizontal, to,
    } = this.state;

    const isNumbers = typeof min === 'number' && typeof max === 'number'
    && typeof from === 'number' && typeof from === 'number';

    if (isNumbers) {
      this.subView.textContent = this.isDouble ? `${from} - ${to}` : from.toString();
      if (horizontal) {
        this.subView.style.top = `${convertValueInPercent(min, max, from)}%`;
        return;
      }
      this.subView.style.left = `${convertValueInPercent(min, max, from)}%`;
    }
  }
}

export default Tip;
