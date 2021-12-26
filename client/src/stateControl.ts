export default class {
  titleSetter: (input: string) => void;
  constructor() {
    this.titleSetter = () => {};
  }

  setTitleSetter(fn: (input: string) => void) {
    this.titleSetter = fn;
  }

  getTitleSetter() {
    return this.titleSetter;
  }

} 