import EventCreator from './EventCreator';

import { SubViewEvent, SubViewEventCallBack } from '../../types/types';

describe('test EventCreator', () => {
  let eventCreator: EventCreator<SubViewEvent, SubViewEventCallBack>;

  beforeEach(() => {
    eventCreator = new EventCreator();
  });

  test('Should be cant create instance of EventCreator', () => {
    expect(eventCreator).toBeInstanceOf(EventCreator);
  });

  test('Should be cant register event', () => {
    eventCreator.registerEvent('someEvent');
    expect(eventCreator.events.someEvent).toEqual({ name: 'someEvent', callbacks: [] });
  });

  test('Should be cant dispatch event ', () => {
    let eventArgs = {};
    function saveEventArgs(e: SubViewEvent) {
      eventArgs = { ...e };
    }

    eventCreator.registerEvent('someEvent');
    eventCreator.addEventListener('someEvent', saveEventArgs);
    eventCreator.dispatchEvent('someEvent', { target: 'handle', position: 10 });

    expect(eventArgs).toEqual({ target: 'handle', position: 10 });
  });
});
