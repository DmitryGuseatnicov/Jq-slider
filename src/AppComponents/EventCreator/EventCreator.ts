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

class EventCreator {
  events: {
    [key: string]: MyEvent<any>
  };

  constructor() {
    this.events = {};
  }

  public registerEvent<T>(eventName: string) {
    const event = new MyEvent<T>(eventName);
    this.events[eventName] = event;
  }

  public dispatchEvent<T>(eventName: string, eventArgs: T) {
    this.events[eventName].callbacks.forEach((callback) => {
      callback(eventArgs);
    });
  }

  public addEventListener<T>(eventName: string, callback: T) {
    this.events[eventName].registerCallback(callback);
  }
}

export default EventCreator;
