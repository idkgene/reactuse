import { StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import "../../app/globals.css";

export default {
  title: "Badge",
  component: Badge,
};

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    id: "example-badge",
    variant: "default",
  },
};
