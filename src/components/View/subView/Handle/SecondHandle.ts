import Handle from './Handle';

class SecondHandle extends Handle {
  public subView!: HTMLElement;

  constructor(slider: HTMLElement) {
    super(slider);
    this.role = 'to';
  }

  protected update(): void {
    const size = this.state.horizontal
      ? this.slider.clientHeight
      : this.slider.clientWidth;

    if (this.getPosition() > size / 2) {
      this.subView.style.zIndex = '1';
    } else {
      this.subView.style.zIndex = '3';
    }

    super.update();
  }
}

export default SecondHandle;
