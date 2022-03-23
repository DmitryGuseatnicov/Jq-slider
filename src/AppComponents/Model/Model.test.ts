import Model from './Model';
import { State } from '../../types/types';

describe('Test Model', () => {
  let model: Model;
  let state: State;

  beforeEach(() => {
    state = {
      min: 0,
      max: 100,
      from: 0,
      to: 100,
      step: 1,
      tip: true,
      range: true,
      progress: true,
      scale: true,
      scaleDestiny: 1,
      horizontal: false,
    };
    model = new Model(state);
  });

  test('Should be instance of Model', () => {
    expect(model).toBeInstanceOf(Model);
  });

  test('Should be correct state after init', () => {
    expect(model.getState()).toEqual(state);
  });

  test('Should be correct values after update from or to', () => {
    model.setState({ from: 10 });
    expect(model.getState().from).toBe(10);

    model.setState({ from: -10 });
    expect(model.getState().from).toBe(0);

    model.setState({ from: 43 });
    expect(model.getState().from).toBe(43);

    model.setState({ to: 90 });
    expect(model.getState().to).toBe(90);

    model.setState({ to: 1 });
    expect(model.getState().to).toBe(43);

    model.setState({ to: 87 });
    expect(model.getState().to).toBe(87);
  });

  test('Should be correct params with not valid min and max', () => {
    model.setState({ min: 100, max: 10 });
    expect(model.getState().min).toBe(10);
  });
});
