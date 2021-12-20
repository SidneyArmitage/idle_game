class Subscribable<T> {
  private value: T;
  private subscribers: Record<number, () => void>;
  private counter: number;
  
  constructor(value: T) {
    this.value = value;
    this.subscribers = [];
    this.counter = 0;
  }

  get() {
    return structuredClone(this.value);
  }

  set(value: T) {
    this.value = value;
    Object.values(this.subscribers).forEach((fn) => fn());
  }

  subscribe(callback: () => void) {
    const value = this.counter++;
    this.subscribers[value] = callback;
    return value;
  }

  unsubscribe(value: number) {
    if (this.subscribers[value]) {
      delete this.subscribers[value];
      return true;
    }
    return false;
  }

}

export default Subscribable;

