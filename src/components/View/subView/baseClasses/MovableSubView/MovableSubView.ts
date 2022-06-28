import SubView from '../abstractSubView/abstractSubView';
import { RoleSubView, State } from '../../../../../types/types';
import { convertValueInPercent } from '../../../../../utils/calcUtils';

interface IMovableSubView {
  min: number;
  max: number;
  from: number;
  to: number;
  horizontal: boolean;
}

class MovableSubView extends SubView<IMovableSubView> {
  role: RoleSubView;

  constructor(slider: HTMLElement) {
    super(slider);
    this.role = 'from';
    this.init();
  }

  public setState(state: State): void {
    const { min, max, from, to, horizontal } = state;

    this.state = {
      ...this.state,
      min,
      max,
      from,
      to,
      horizontal,
    };

    this.update();
  }

  public init(): void {
    this.createSubView();
    this.registerEvent('SubViewEvent');
    this.bindEventListener();
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

  public pointerHandler(e: PointerEvent): void {
    this.dispatchEvent('SubViewEvent', {
      target: this.role,
      position: this.state.horizontal
        ? e.clientY - this.slider.getBoundingClientRect().top
        : e.clientX - this.slider.getBoundingClientRect().left,
    });
  }

  public createSubView(): void {
    this.subView = document.createElement('div');
    this.slider.appendChild(this.subView);
  }

  public update(): void {
    const { min, max, from, to, horizontal } = this.state;

    const value = this.role === 'from' ? from : to;

    if (horizontal) {
      this.subView.style.top = `${convertValueInPercent(min, max, value)}%`;
    } else {
      this.subView.style.left = `${convertValueInPercent(min, max, value)}%`;
    }
  }
}

export default MovableSubView;
