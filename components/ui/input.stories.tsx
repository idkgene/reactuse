import { Input } from "./input";
import { Meta } from "@storybook/react";
import "../../app/globals.css";

export default {
  title: "Input",
  component: Input,
} as Meta;

export const Default = () => <Input placeholder="Enter text..." />;

Default.parameters = {
  docs: {
    description: {
      story: "The default input component.",
    },
  },
};
