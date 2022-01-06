import Bar from "../components/svg/bar";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { interpolate3, interpolateVia3 } from "../util/generateColours";

export default {
  title: "bar",
  component: Bar,
} as ComponentMeta<typeof Bar>;

const Template: ComponentStory<typeof Bar> = (args) => <Bar {...args}/>

export const Defaults = Template.bind({});
Defaults.args = {
  dataPoints:[25, 25, 25, 25],
  gap: 0,
}

const toOne = (vector: [number, number, number]) => (Math.floor(vector[0]) + Math.floor(vector[1]) * 0x100 + Math.floor(vector[2]) * 0x10000);

export const Colours = Template.bind({});
Colours.args = {
  dataPoints: Array(27).fill(2),
  colours: interpolate3(27, [255, 0, 0], [0, 255, 0]).map(toOne),
  gap: 0,
};

export const ColoursVia = Template.bind({});
ColoursVia.args = {
  dataPoints: Array(27).fill(2),
  colours: interpolateVia3([[9, [0xFF, 0, 0]], [9, [0, 0xFF, 0]], [9, [0, 0, 0xFF]]], [0, 0, 0xFF]).map(toOne),
  gap: 0,
};