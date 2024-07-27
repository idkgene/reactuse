import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea, ScrollBar } from './scroll-area';

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom scroll area component built on top of Radix UI ScrollArea Primitive.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'The orientation of the scroll bar.',
    },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

function LoremIpsum() {
  return (
    <>
      {Array.from({ length: 50 }, (_, i) => (
        <p key={i} className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae
          tincidunt nisl nunc euismod nunc.
        </p>
      ))}
    </>
  );
}

export const Default: Story = {
  render: (args) => (
    <ScrollArea className="h-72 w-48 rounded border p-4" {...args}>
      <LoremIpsum />
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  render: (args) => (
    <ScrollArea className="h-32 w-96 rounded border p-4" {...args}>
      <div className="flex space-x-4">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="flex size-20 shrink-0 items-center justify-center rounded-md bg-slate-200"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const BothScrollbars: Story = {
  render: (args) => (
    <ScrollArea className="size-72 rounded border p-4" {...args}>
      <div className="w-[500px]">
        <LoremIpsum />
      </div>
    </ScrollArea>
  ),
};

export const CustomScrollbar: Story = {
  render: (args) => (
    <ScrollArea className="h-72 w-48 rounded border p-4" {...args}>
      <LoremIpsum />
      <ScrollBar className="bg-slate-100" orientation="vertical" />
    </ScrollArea>
  ),
};

export const NestedScrollAreas: Story = {
  render: (args) => (
    <ScrollArea className="size-96 rounded border p-4" {...args}>
      <h2 className="mb-4 text-xl font-bold">Outer Scroll Area</h2>
      <LoremIpsum />
      <ScrollArea className="mt-4 h-48 w-full rounded border p-4">
        <h3 className="mb-2 text-lg font-semibold">Inner Scroll Area</h3>
        <LoremIpsum />
      </ScrollArea>
      <LoremIpsum />
    </ScrollArea>
  ),
};
