/* eslint-disable no-undef */
import './demo-page.scss';

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

$('.demo-slider').jqSlider(state);
