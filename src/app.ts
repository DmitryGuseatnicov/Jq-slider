/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import './slider.scss';
import Presenter from './AppComponents/Presenter/Presenter';

const state = {
  min: 0,
  max: 100,
  from: 1,
  to: 900,
  step: 5,
  tip: true,
  range: true,
  progress: true,
  scale: true,
  scaleDestiny: 10,
  horizontal: true,
};

const slider = document.querySelector('.demo-slider');
if (slider instanceof HTMLElement) {
  // eslint-disable-next-line no-unused-vars
  const testSlider = new Presenter(slider, state);
}
