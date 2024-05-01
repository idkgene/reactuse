import { StoryObj } from "@storybook/react";
import Alert from "./alert";
import "../../app/globals.css";

export default {
  title: "Alert",
  component: Alert,
};

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    id: "example-alert",
    type: "primary",
    icon: "💠",
    message: "Example Alert",
  },
};
