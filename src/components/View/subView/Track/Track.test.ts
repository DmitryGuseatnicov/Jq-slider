/**
 *  @jest-environment jsdom
 */
import Track from './Track';

import { State } from '../../../../types/types';

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

  test('should be created Track width progress', () => {
    track.setState(state);
    expect(track.subView).toBeInstanceOf(HTMLElement);
    expect(track.subView.querySelector('.jq-slider__progress')).toBeInstanceOf(
      HTMLElement,
    );
  });

  test('should be correct size of progress', () => {
    track.setState(state);
    let progress: HTMLElement = track.subView.querySelector(
      '.jq-slider__progress',
    )!;
    expect(progress.style.width).toBe('100%');

    state = { ...state, from: 25, to: 100 };
    track.setState(state);
    progress = track.subView.querySelector('.jq-slider__progress')!;
    expect(progress.style.width).toBe('75%');

    state = { ...state, from: 30, to: 90 };
    track.setState(state);
    progress = track.subView.querySelector('.jq-slider__progress')!;
    expect(progress.style.width).toBe('60%');

    state = {
      ...state,
      min: -20,
      from: 30,
      to: 90,
    };
    track.setState(state);
    progress = track.subView.querySelector('.jq-slider__progress')!;
    expect(progress.style.width).toBe('50%');

    state = {
      ...state,
      min: -20,
      from: 30,
      to: 90,
      horizontal: true,
    };
    track.setState(state);
    progress = track.subView.querySelector('.jq-slider__progress')!;
    expect(progress.style.height).toBe('50%');

    state = {
      ...state,
      range: false,
      min: 0,
      from: 50,
    };
    track.setState(state);
    progress = track.subView.querySelector('.jq-slider__progress')!;
    expect(progress.style.height).toBe('50%');
  });

  test('Should dont be in TrackHTML progressHTML then progress false', () => {
    track.setState(state);
    state = { ...state, progress: false };
    track.setState(state);
    expect(track.subView.querySelector('.jq-slider__progress')!).toBeNull();
  });

  test('Should dont be update if set not correct params', () => {
    track.setState({
      ...state,
      min: 'not are number' as any,
      max: '100' as any,
    });

    const progress = track.subView.querySelector('.jq-slider__progress')!;
    expect(progress.innerHTML).toBe('');
  });
});
