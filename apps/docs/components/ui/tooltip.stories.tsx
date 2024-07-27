import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './tooltip';
import { Button } from './button';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover for details</Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-sm">
          <h3 className="mb-1 font-bold">Custom Tooltip</h3>
          <p>This tooltip has custom content with multiple lines.</p>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip delayDuration={700}>
      <TooltipTrigger asChild>
        <Button variant="outline">Delayed Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip appears after a delay</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithCustomPosition: Story = {
  render: () => (
    <div className="flex space-x-4">
      {['top', 'right', 'bottom', 'left'].map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side as 'top' | 'right' | 'bottom' | 'left'}>
            <p>This tooltip is on the {side}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithCustomStyles: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Custom Styled</Button>
      </TooltipTrigger>
      <TooltipContent className="border-blue-600 bg-blue-500 text-white">
        <p>This tooltip has custom styles</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" className="size-10 p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Information tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const InteractiveTooltip: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Interactive Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-sm">
          <p className="mb-2">This is an interactive tooltip.</p>
          <Button
            size="sm"
            onClick={() => {
              alert('Button clicked!');
            }}
          >
            Click me!
          </Button>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};

export const ControlledTooltip: Story = {
  render: function ControlledTooltipExample() {
    const [open, setOpen] = React.useState(false);

    return (
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            {open ? 'Close Tooltip' : 'Open Tooltip'}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a controlled tooltip</p>
        </TooltipContent>
      </Tooltip>
    );
  },
};
