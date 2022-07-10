import { RoleSubView } from 'types/types';
import { convertValueInPercent } from 'utils/calcUtils';

import SubView from '../abstractSubView/abstractSubView';

class MovableSubView extends SubView {
  role: RoleSubView;

  constructor(slider: HTMLElement) {
    super(slider);
    this.role = 'from';
    this.init();
  }

  protected init(): void {
    this.createSubView();
    this.registerEvent('SubViewEvent');
    this.bindEventListener();
  }

  protected pointerHandler(e: PointerEvent): void {
    this.dispatchEvent('SubViewEvent', {
      target: this.role,
      position: this.state.horizontal
        ? e.clientY - this.slider.getBoundingClientRect().top
        : e.clientX - this.slider.getBoundingClientRect().left,
    });
  }

  protected createSubView(): void {
    this.subView = document.createElement('div');
    this.slider.appendChild(this.subView);
  }

  protected update(): void {
    const { min, max, from, to, horizontal } = this.state;

    const value = this.role === 'from' ? from : to;

    if (horizontal) {
      this.subView.style.top = `${convertValueInPercent(min, max, value)}%`;
    } else {
      this.subView.style.left = `${convertValueInPercent(min, max, value)}%`;
    }
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
}

export default MovableSubView;
