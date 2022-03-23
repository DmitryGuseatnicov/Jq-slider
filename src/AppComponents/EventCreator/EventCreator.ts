import MyEvent from './MyEvent';

class EventCreator<T, R> {
  events: {
    [key: string]: MyEvent<R>
  };

  constructor() {
    this.events = {};
  }

  public registerEvent(eventName: string) {
    const event = new MyEvent<R>(eventName);
    this.events[eventName] = event;
  }

  public dispatchEvent(eventName: string, eventArgs: T) {
    this.events[eventName].callbacks.forEach((callback: any) => {
      callback(eventArgs);
    });
  }

  public addEventListener(eventName: string, callback: R) {
    this.events[eventName].registerCallback(callback);
  }
}

export default EventCreator;
