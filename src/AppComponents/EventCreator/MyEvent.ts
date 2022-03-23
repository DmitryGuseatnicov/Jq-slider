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

export default MyEvent;
