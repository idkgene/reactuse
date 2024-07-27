import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggle switch component built on top of Radix UI Switch Primitive.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The controlled checked state of the switch.',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'The default checked state when initially rendered.',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Event handler called when the checked state changes.',
    },
    disabled: {
      control: 'boolean',
      description:
        'When true, prevents the user from interacting with the switch.',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" {...args} />
      <label htmlFor="airplane-mode" className="text-sm font-medium">
        Airplane Mode
      </label>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="flex flex-col items-center space-y-2">
        <Switch checked={checked} onCheckedChange={setChecked} />
        <p className="text-sm">The switch is {checked ? 'on' : 'off'}</p>
      </div>
    );
  },
};

export const CustomColors: Story = {
  args: {
    className:
      'data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500',
  },
};

export const WithForm: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        alert(`Form submitted with value: ${formData.get('switch-field')}`);
      }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <Switch id="terms" name="switch-field" />
        <label htmlFor="terms" className="text-sm font-medium">
          I agree to the terms and conditions
        </label>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  ),
};
