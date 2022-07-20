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

  protected handleSubViewPointermove(e: PointerEvent): void {
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
    this.handleSubViewPointerdown = this.handleSubViewPointerdown.bind(this);
    this.subView.addEventListener('pointerdown', this.handleSubViewPointerdown);
  }

  private handleSubViewPointerdown(): void {
    this.handleSubViewPointermove = this.handleSubViewPointermove.bind(this);
    this.handleSubViewPointerup = this.handleSubViewPointerup.bind(this);

    window.addEventListener('pointermove', this.handleSubViewPointermove);
    window.addEventListener('pointerup', this.handleSubViewPointerup);
  }

  private handleSubViewPointerup() {
    window.removeEventListener('pointermove', this.handleSubViewPointermove);
  }
}

export default MovableSubView;
