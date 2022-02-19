import { ReactNode } from "react";

export default class StateControl {
  private titleSetter: (input: ReactNode) => void;
  private title: ReactNode;
  constructor() {
    this.titleSetter = () => {};
    this.title = "";
  }

  setTitleSetter(fn: (input: ReactNode) => void) {
    this.titleSetter = fn;
  }

  getTitleSetter() {
    return (title: ReactNode) => {
      this.titleSetter(title);
      this.title = title;
    };
  }

  getTitle() {
    return this.title;
  }

} 