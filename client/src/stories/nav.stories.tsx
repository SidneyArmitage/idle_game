import { ComponentMeta } from "@storybook/react";
import { Component } from "react";
import "../index.scss";
import "../App.scss";

export default {
  title: "Nav",
  component: Component,
} as ComponentMeta<typeof Component>

export const Nav = () => (
  <nav>
    <div className="head"></div>
    <ul>
      <li className="link">Item A</li>
      <li className="link">Item B</li>
      <li className="link">Item C</li>
      <li className="link active">Selected</li>
      <li className="link">Item D</li>
    </ul>
    <div className="tail"></div>
  </nav>
);