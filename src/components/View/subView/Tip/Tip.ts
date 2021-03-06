import MovableSubView from '../baseClasses/MovableSubView/MovableSubView';

class Tip extends MovableSubView {
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
    this.subView.style.zIndex = '5';
  }

  protected update(): void {
    super.update();

    const { from, to } = this.state;

    this.subView.textContent = this.isDouble
      ? `${from} - ${to}`
      : from.toString();
  }
}

export default Tip;
