export default class {
  private titleSetter: (input: string) => void;
  private title: string;
  constructor() {
    this.titleSetter = () => {};
    this.title = "";
  }

  setTitleSetter(fn: (input: string) => void) {
    this.titleSetter = fn;
  }

  getTitleSetter() {
    return (title: string) => {
      this.titleSetter(title);
      this.title = title;
    };
  }

  getTitle() {
    return this.title;
  }

} 