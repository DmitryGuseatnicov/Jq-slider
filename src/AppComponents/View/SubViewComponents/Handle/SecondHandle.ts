import Handle from './Handle';

import { State } from '../../../../types/types';
import { convertValueInPercent } from '../../../../utils/calcUtils';

class SecondHandle extends Handle {
  public setState(state: State): void {
    const {
      min, max, to, horizontal,
    } = state;

    this.state = {
      ...this.state, min, max, to, horizontal,
    };

    this.update();
  }

  protected pointerHandler(e: PointerEvent): void {
    this.dispatchEvent('SubViewEvent', {
      target: 'secondHandle',
      position: this.state.horizontal
        ? e.clientY - this.slider.getBoundingClientRect().top
        : e.clientX - this.slider.getBoundingClientRect().left,
    });
  }

  protected update(): void {
    const {
      min, max, to, horizontal,
    } = this.state;
    const isNumbers = typeof min === 'number' && typeof max === 'number' && typeof to === 'number';

    if (isNumbers) {
      if (horizontal) {
        this.subView.style.top = `${convertValueInPercent(min, max, to)}%`;
        return;
      }
      this.subView.style.left = `${convertValueInPercent(min, max, to)}%`;
    }
  }
}

export default SecondHandle;
