import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A accessible label component built on top of Radix UI Label Primitive.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the label',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the label',
    },
    htmlFor: {
      control: 'text',
      description: 'The ID of the form control this label is associated with',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Label',
  },
};

export const AssociatedWithInput: Story = {
  args: {
    children: 'Username',
    htmlFor: 'username',
  },
  render: (args) => (
    <div>
      <Label {...args} />
      <input
        id="username"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      />
    </div>
  ),
};

export const CustomStyled: Story = {
  args: {
    children: 'Custom Styled Label',
    className: 'text-blue-600 font-bold',
  },
};

export const WithTooltip: Story = {
  args: {
    children: 'Label with Tooltip',
    htmlFor: 'with-tooltip',
  },
  render: (args) => (
    <div className="relative">
      <Label {...args} />
      <span className="ml-1 text-sm text-gray-500">
        (?)
        <span className="absolute left-full top-0 w-48 rounded bg-black p-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          This is a tooltip explaining the label
        </span>
      </span>
      <input
        id="with-tooltip"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      />
    </div>
  ),
};

export const RequiredField: Story = {
  args: {
    children: 'Required Field',
    htmlFor: 'required-field',
  },
  render: (args) => (
    <div>
      <Label {...args}>
        {args.children} <span className="text-red-500">*</span>
      </Label>
      <input
        id="required-field"
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      />
    </div>
  ),
};
