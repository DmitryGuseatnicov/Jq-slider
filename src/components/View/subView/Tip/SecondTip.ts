import Tip from './Tip';

class SecondTip extends Tip {
  constructor(slider: HTMLElement) {
    super(slider);
    this.role = 'to';
  }

  public update(): void {
    super.update();

    const { to } = this.state;

    if (typeof to !== 'number') {
      return;
    }

    if (this.isDouble) {
      this.subView.style.opacity = '0';
    } else {
      this.subView.style.opacity = '1';
    }
    this.subView.textContent = to.toString();
  }
}

export default SecondTip;
