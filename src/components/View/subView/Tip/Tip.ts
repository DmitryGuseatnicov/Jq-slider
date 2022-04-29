import MovableSubView from '../baseClasses/MovableSubView/MovableSubView';

class Tip extends MovableSubView {
  public subView!: HTMLElement;

  public isDouble: boolean;

  constructor(slider: HTMLElement) {
    super(slider);
    this.isDouble = false;
  }

  public changeIsDouble(value: boolean) {
    this.isDouble = value;
  }

  protected createSubView(): void {
    super.createSubView();
    this.subView.classList.add('jq-slider__tip');
  }

  protected update(): void {
    super.update();

    const { from, to } = this.state;

    const isNumbers = typeof from === 'number' && typeof to === 'number';

    if (!isNumbers) {
      return;
    }

    this.subView.textContent = this.isDouble
      ? `${from} - ${to}`
      : from.toString();
  }
}

export default Tip;
