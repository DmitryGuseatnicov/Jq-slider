/**
 *  @jest-environment jsdom
 */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { State } from '../../../../types/types';
import Track from './Track';

describe('Test Track', () => {
  let track: Track;
  let state: State;
  let slider: HTMLElement;
  beforeEach(() => {
    slider = document.createElement('div');
    slider.style.width = '1000';
    track = new Track(slider);
    state = {
      min: 0,
      max: 100,
      from: 0,
      to: 100,
      step: 5,
      tip: true,
      range: true,
      progress: true,
      scale: true,
      scaleDestiny: 10,
      horizontal: false,
    };
  });

  test('Should be instance of Track', () => {
    expect(track).toBeInstanceOf(Track);
  });

  test('should be created Track width progress', () => {
    track.setState(state);
    expect(track.subView).toBeInstanceOf(HTMLElement);
    expect(track.subView.querySelector('.jq-slider__progress')).toBeInstanceOf(HTMLElement);
  });

  test('should be correct size of progress', () => {
    track.setState(state);
    let progress: HTMLElement = track.subView.querySelector('.jq-slider__progress')!;
    expect(progress.style.width).toBe('100%');

    state = { ...state, from: 25, to: 100 };
    track.setState(state);
    progress = track.subView.querySelector('.jq-slider__progress')!;
    expect(progress.style.width).toBe('75%');

    state = { ...state, from: 30, to: 90 };
    track.setState(state);
    progress = track.subView.querySelector('.jq-slider__progress')!;
    expect(progress.style.width).toBe('50%');

    state = {
      ...state, min: -20, from: 30, to: 90,
    };
    track.setState(state);
    progress = track.subView.querySelector('.jq-slider__progress')!;
    expect(progress.style.width).toBe('60%');
  });
});
