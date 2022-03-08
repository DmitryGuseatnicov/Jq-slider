/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { State } from '../../../../types/types';
import { convertValueInPercent } from '../../../../utils/calcUtils';
import Tip from './Tip';

class SecondTip extends Tip {
  public setState(state: State): void {
    const {
      min = this.state.min,
      max = this.state.max,
      to = this.state.to,
      horizontal = this.state.horizontal,
    } = state;

    this.state = {
      min, max, to, horizontal,
    };

    this.update();
  }

  protected update(): void {
    const {
      min, max, to, horizontal,
    } = this.state;

    const isNumbers = typeof min === 'number' && typeof max === 'number' && typeof to === 'number';

    if (isNumbers) {
      // eslint-disable-next-line no-unused-expressions
      this.isDouble ? this.subView.style.opacity = '0' : this.subView.style.opacity = '1';
      this.subView.textContent = to.toString();
      if (horizontal) {
        this.subView.style.top = `${convertValueInPercent(min, max, to)}%`;
        return;
      }
      this.subView.style.left = `${convertValueInPercent(min, max, to)}%`;
    }
  }
}

export default SecondTip;
