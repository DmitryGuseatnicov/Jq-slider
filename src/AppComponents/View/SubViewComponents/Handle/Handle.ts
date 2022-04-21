import SubView from '../../abstractSubView/abstractSubView';
import { State } from '../../../../types/types';
import { convertValueInPercent } from '../../../../utils/calcUtils';

class Handle extends SubView {
  public subView!: HTMLElement;

  constructor(slider: HTMLElement) {
    super(slider);
    this.init();
  }

  public setState(state: State): void {
    const { min, max, from, horizontal } = state;

    this.state = {
      ...this.state,
      min,
      max,
      from,
      horizontal,
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

  protected init(): void {
    this.createSubView();
    this.registerEvent('SubViewEvent');
    this.bindEventListener();
  }

  public createSubView(): void {
    this.subView = document.createElement('div');
    this.subView.classList.add('jq-slider__handle');
    this.slider.appendChild(this.subView);
    this.subView.style.zIndex = '2';
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
      target: 'handle',
      position: this.state.horizontal
        ? e.clientY - this.slider.getBoundingClientRect().top
        : e.clientX - this.slider.getBoundingClientRect().left,
    });
  }

  protected update(): void {
    const { min, max, from, horizontal } = this.state;

    const isNumbers =
      typeof min === 'number' &&
      typeof max === 'number' &&
      typeof from === 'number';

    if (isNumbers) {
      if (horizontal) {
        this.subView.style.top = `${convertValueInPercent(min, max, from)}%`;
      } else {
        this.subView.style.left = `${convertValueInPercent(min, max, from)}%`;
      }
    }
  }
}

export default Handle;
