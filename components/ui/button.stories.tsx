import { Button } from "./button";

export default {
  title: "Button",
  component: Button,
};

export const Default = () => <Button variant="default">Default</Button>;

export const Destructive = () => <Button variant="destructive">Primary</Button>;

export const Outline = () => <Button variant="outline">Secondary</Button>;

export const Secondary = () => <Button variant="secondary">Outline</Button>;

export const Ghost = () => <Button variant="ghost">Link</Button>;

export const Link = () => <Button variant="link">Link</Button>;