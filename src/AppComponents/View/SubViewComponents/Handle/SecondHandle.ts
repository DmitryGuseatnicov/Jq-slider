/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Data } from '../../../../types/types';
import { convertPixelInPercent, convertValueInPercent } from '../../../../utils/calcUtils';
import Handle from './Handle';

class SecondHandle extends Handle {
  public setState(state: Data): void {
    const {
      min = this.state.min,
      max = this.state.max,
      to = this.state.to,
      horizontal = this.state.horizontal,
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
        ? convertPixelInPercent(this.slider.clientHeight, e.clientY - this.slider.getBoundingClientRect().top)
        : convertPixelInPercent(this.slider.clientWidth, e.clientX - this.slider.getBoundingClientRect().left),
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
