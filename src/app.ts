/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import './slider.scss';
import View from './AppComponents/View/View';

const slider = document.querySelector('.demo-slider');
if (slider instanceof HTMLElement) {
  // eslint-disable-next-line no-unused-vars
  const testSlider = new View(slider);
}
