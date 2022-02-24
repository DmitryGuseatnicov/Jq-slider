/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { ViewEvent, ViewEventCallBack } from '../../types/types';
import EventCreator from './EventCreator';

describe('test EventCreator', () => {
  let eventCreator: EventCreator;

  beforeEach(() => {
    eventCreator = new EventCreator();
  });

  test('Should be cant create instance of EventCreator', () => {
    expect(eventCreator).toBeInstanceOf(EventCreator);
  });

  test('Should be cant register event', () => {
    eventCreator.registerEvent<ViewEvent>('someEvent');
    expect(eventCreator.events.someEvent).toEqual({ name: 'someEvent', callbacks: [] });
  });

  test('Should be cant dispatch event ', () => {
    let eventArgs = {};

    eventCreator.registerEvent<ViewEvent>('someEvent');
    eventCreator.addEventListener<ViewEventCallBack>('someEvent', (e: ViewEvent) => {
      eventArgs = { ...e };
    });
    eventCreator.dispatchEvent<ViewEvent>('someEvent', { target: 'handle', args: { x: 10, y: 20 } });

    expect(eventArgs).toEqual({ target: 'handle', args: { x: 10, y: 20 } });
  });
});
