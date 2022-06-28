import MovableSubView from '../baseClasses/MovableSubView/MovableSubView';

class Handle extends MovableSubView {
  public getPosition(): number {
    if (this.state.horizontal) {
      const subViewTop = this.subView.getBoundingClientRect().top;
      const sliderTop = this.slider.getBoundingClientRect().top;
      return subViewTop - sliderTop + this.subView.offsetHeight / 2;
    }

    const subViewLeft = this.subView.getBoundingClientRect().left;
    const sliderLeft = this.slider.getBoundingClientRect().left;
    return subViewLeft - sliderLeft + this.subView.offsetWidth / 2;
  }

  public createSubView(): void {
    super.createSubView();
    this.subView.classList.add('jq-slider__handle');
    this.subView.style.zIndex = '2';
  }
}

export default Handle;
