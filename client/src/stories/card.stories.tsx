import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "../components/card";

export default {
  title: "Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const SingleTemplate: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Basic = SingleTemplate.bind({});

Basic.args = {
  title: "Test",
  children: "Nam eleifend felis at lobortis egestas. Sed a dignissim est. Quisque finibus interdum ipsum a aliquet. Phasellus sit amet odio a purus eleifend pellentesque et nec urna. Duis non ipsum ante. Etiam a urna sodales, porta sapien pretium, viverra urna. Vivamus eget enim velit.",
  icon: "https://user-images.githubusercontent.com/24874033/39674914-011fd850-5171-11e8-82b5-01e8613114cf.png",
}

const multiTemplate: ComponentStory<typeof Card> = (args) => (<div style={{
  display: "grid",
  gridTemplateColumns: "auto auto auto auto",
}}>
  <Card {...args}/>
  <Card {...args}/>
  <Card {...args}/>
  <Card {...args}/>
</div>);

export const Multiple = multiTemplate.bind({});

Multiple.args = {
  title: "Test",
  children: "Nam eleifend felis at lobortis egestas. Sed a dignissim est. Quisque finibus interdum ipsum a aliquet. Phasellus sit amet odio a purus eleifend pellentesque et nec urna. Duis non ipsum ante. Etiam a urna sodales, porta sapien pretium, viverra urna. Vivamus eget enim velit.",
  icon: "https://user-images.githubusercontent.com/24874033/39674914-011fd850-5171-11e8-82b5-01e8613114cf.png",
};