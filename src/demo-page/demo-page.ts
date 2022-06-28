/* eslint-disable no-undef */
import { Data, State } from 'types/types';
import './demo-page.scss';

const arrOfStates = [
  {
    min: 0,
    max: 100,
    from: 33,
    to: 90,
    step: 1,
    tip: true,
    range: false,
    progress: true,
    scale: false,
    scaleDestiny: 50,
    horizontal: false,
  },
  {
    min: 0,
    max: 1000,
    from: 0,
    to: 900,
    step: 50,
    tip: true,
    range: true,
    progress: true,
    scale: true,
    scaleDestiny: 50,
    horizontal: false,
  },
  {
    min: -100,
    max: 100,
    from: 0,
    to: 90,
    step: 0.1,
    tip: true,
    range: true,
    progress: true,
    scale: true,
    scaleDestiny: 50,
    horizontal: false,
  },

  {
    min: 500,
    max: 10000,
    from: 1000,
    to: 90,
    step: 1,
    tip: true,
    range: false,
    progress: true,
    scale: true,
    scaleDestiny: 1500,
    horizontal: true,
  },
];

class ControlPanel {
  $nodeElem: JQuery<HTMLElement>;

  $slider: JQuery<HTMLElement>;

  $inputs: JQuery<HTMLElement>;

  constructor(nodeElem: HTMLElement, data: Data) {
    this.$nodeElem = $(nodeElem);
    this.$slider = this.$nodeElem.find('.js-demo-slider');
    this.$inputs = this.$nodeElem.find('.js-control-panel__input');
    this.init(data);
  }

  init(data: Data) {
    this.$slider.jqSlider();
    this.bindEventListeners();
    this.$slider.jqSlider('update', data);
  }

  bindEventListeners() {
    this.inputHandler = this.inputHandler.bind(this);
    this.sliderHandler = this.sliderHandler.bind(this);

    this.$inputs.on('change', this.inputHandler);
    this.$slider.jqSlider('onChange', this.sliderHandler);
  }

  inputHandler(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    if (e.target.type === 'number') {
      this.$slider.jqSlider('update', { [e.target.name]: +e.target.value });
    }

    if (e.target.type === 'checkbox') {
      this.$slider.jqSlider('update', { [e.target.name]: e.target.checked });
    }
  }

  sliderHandler(e: State) {
    this.$inputs.each((i, el) => {
      if (!(el instanceof HTMLInputElement)) {
        return;
      }

      if (el.type === 'number') {
        $(el).val(+e[el.name as keyof State]);
      }

      if (el.type === 'checkbox') {
        $(el).prop('checked', e[el.name as keyof State]);
      }
    });
  }
}

$('.js-demo').each((i, el) => {
  // eslint-disable-next-line no-unused-vars
  const panel = new ControlPanel(el, arrOfStates[i]);
});
