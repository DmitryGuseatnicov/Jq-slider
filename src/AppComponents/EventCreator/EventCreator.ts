/* eslint-disable max-classes-per-file */
// eslint-disable-next-line max-classes-per-file

class MyEvent<T> {
  public name: string;

  public callbacks: Array<T>;

  constructor(name: string) {
    this.name = name;
    this.callbacks = [];
  }

  public registerCallback(callback: T) {
    this.callbacks.push(callback);
  }
}

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
