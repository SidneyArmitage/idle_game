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
    <ul>
      <li>Item A</li>
      <li>Item B</li>
      <li>Item C</li>
      <li className="active-link">Selected</li>
      <li>Item D</li>
    </ul>
  </nav>
);