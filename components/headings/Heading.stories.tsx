import { StoryObj } from "@storybook/react";
import Heading from "./Heading";

export default {
  title: "Heading",
  component: Heading,
};

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    level: 1,
    children: "Example Heading",
  },
};
