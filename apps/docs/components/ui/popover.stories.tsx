import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { Button } from './button'; // Предполагается, что у вас есть компонент Button

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible and accessible popover component built on top of Radix UI Popover Primitive.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Аргументы для PopoverContent, так как они наиболее настраиваемые
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description:
        'The preferred alignment of the popover relative to its trigger.',
    },
    sideOffset: {
      control: 'number',
      description: 'The distance in pixels from the trigger.',
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" {...args}>
        <h3 className="mb-2 font-medium">Popover Content</h3>
        <p>This is the content of the popover.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const DifferentAlignments: Story = {
  render: () => (
    <div className="flex space-x-4">
      {['start', 'center', 'end'].map((align) => (
        <Popover key={align}>
          <PopoverTrigger asChild>
            <Button variant="outline">Align {align}</Button>
          </PopoverTrigger>
          <PopoverContent align={align as 'start' | 'center' | 'end'}>
            <p>This popover is aligned to the {align}.</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Form</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="name">Name</label>
            <input id="name" className="rounded border p-2" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" className="rounded border p-2" />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </PopoverContent>
    </Popover>
  ),
};
