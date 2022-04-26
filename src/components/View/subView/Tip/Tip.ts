import SubView from '../abstractSubView/abstractSubView';
import { State } from '../../../../types/types';
import { convertValueInPercent } from '../../../../utils/calcUtils';

class Tip extends SubView {
  public subView!: HTMLElement;

  public isDouble: boolean;

  constructor(slider: HTMLElement) {
    super(slider);
    this.isDouble = false;
    this.init();
  }

  public setState(state: State): void {
    const { min, max, from, to, horizontal } = state;

    this.state = {
      min,
      max,
      from,
      to,
      horizontal,
    };

    this.update();
  }

  public changeIsDouble(val: boolean) {
    this.isDouble = val;
  }

  protected init(): void {
    this.createSubView();
    this.registerEvent('SubViewEvent');
    this.bindEventListener();
  }

  protected createSubView(): void {
    this.subView = document.createElement('div');
    this.subView.classList.add('jq-slider__tip');
    this.slider.appendChild(this.subView);
  }

  private bindEventListener(): void {
    this.pointerStart = this.pointerStart.bind(this);
    this.subView.addEventListener('pointerdown', this.pointerStart);
  }

  private pointerStart(): void {
    this.pointerHandler = this.pointerHandler.bind(this);
    this.removePointStart = this.removePointStart.bind(this);
    window.addEventListener('pointermove', this.pointerHandler);
    window.addEventListener('pointerup', this.removePointStart);
  }

  private removePointStart() {
    window.removeEventListener('pointermove', this.pointerHandler);
    window.removeEventListener('pointermove', this.pointerHandler);
  }

  protected pointerHandler(e: PointerEvent): void {
    this.dispatchEvent('SubViewEvent', {
      target: 'tip',
      position: this.state.horizontal
        ? e.clientY - this.slider.getBoundingClientRect().top
        : e.clientX - this.slider.getBoundingClientRect().left,
    });
  }

  protected update(): void {
    const { min, max, from, horizontal, to } = this.state;

    const isNumbers =
      typeof min === 'number' &&
      typeof max === 'number' &&
      typeof from === 'number' &&
      typeof from === 'number';

    if (!isNumbers) {
      return;
    }

    this.subView.textContent = this.isDouble
      ? `${from} - ${to}`
      : from.toString();

    if (horizontal) {
      this.subView.style.top = `${convertValueInPercent(min, max, from)}%`;
      return;
    }
    this.subView.style.left = `${convertValueInPercent(min, max, from)}%`;
  }
}

export default Tip;
