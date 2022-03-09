/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import './slider.scss';
import Presenter from './AppComponents/Presenter/Presenter';

const state = {
  min: -10,
  max: 1000,
  from: 1,
  to: 900,
  step: 1,
  tip: true,
  range: true,
  progress: true,
  scale: true,
  scaleDestiny: 50,
  horizontal: false,
};

const slider = document.querySelector('.demo-slider');
if (slider instanceof HTMLElement) {
  // eslint-disable-next-line no-unused-vars
  const testSlider = new Presenter(slider, state);
}
