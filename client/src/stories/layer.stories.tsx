import { ComponentMeta, ComponentStory } from "@storybook/react";
import "../style/layers.scss";
import "./layer.scss";

interface TestElementSingleProps {
  depth: number
}

const TestElementSingle = ({depth}: TestElementSingleProps) => <div className="layer">{depth > 0 ? <TestElementSingle depth={depth - 1}/> : <></>}</div>

export default {
  title: "layers",
  component: TestElementSingle,
} as ComponentMeta<typeof TestElementSingle>

const SingleTemplate: ComponentStory<typeof TestElementSingle> = (args) => <TestElementSingle {...args}/>;

export const Single = SingleTemplate.bind({});
Single.args = {
  depth: 4,
};

export const MultiTemplate = () => (
  <div className="layer">
    <TestElementSingle depth={3}/>
  <div className="layer">
    <button className="layer"></button>
  </div>
    <button className="layer"></button>
  </div>
);