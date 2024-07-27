import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable checkbox component based on Radix UI Checkbox primitive.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The controlled checked state of the checkbox',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'The default checked state when initially rendered',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required',
    },
    name: {
      control: 'text',
      description: 'The name of the checkbox',
    },
    value: {
      control: 'text',
      description: 'The value of the checkbox',
    },
    onCheckedChange: { action: 'checked changed' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Checkbox {...args} />,
};

export const Checked: Story = {
  render: (args) => <Checkbox {...args} />,
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  render: (args) => <Checkbox {...args} />,
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
};

export const InForm: Story = {
  render: (args) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="option1" {...args} name="options" value="option1" />
          <label htmlFor="option1">Option 1</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="option2" {...args} name="options" value="option2" />
          <label htmlFor="option2">Option 2</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="option3" {...args} name="options" value="option3" />
          <label htmlFor="option3">Option 3</label>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 rounded bg-slate-900 px-4 py-2 text-white"
      >
        Submit
      </button>
    </form>
  ),
};

export const CustomSize: Story = {
  render: (args) => <Checkbox {...args} className="size-6" />,
};

export const CustomColor: Story = {
  render: (args) => (
    <Checkbox
      {...args}
      className="border-blue-500 bg-blue-500 text-white focus-visible:ring-blue-500"
    />
  ),
};

export const Indeterminate: Story = {
  render: () => {
    const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(
      'indeterminate',
    );

    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={checked}
          onCheckedChange={(value) => {
            if (value === 'indeterminate') return;
            setChecked(value);
          }}
        />
        <label>Indeterminate checkbox</label>
      </div>
    );
  },
};

export const ControlledCheckbox: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="flex items-center space-x-2">
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        <label>Controlled checkbox (checked: {checked.toString()})</label>
      </div>
    );
  },
};

export const WithAnimation: Story = {
  render: (args) => (
    <Checkbox
      {...args}
      className="transition-all duration-200 ease-in-out hover:scale-110"
    />
  ),
};

export const GroupOfCheckboxes: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = React.useState({
      option1: false,
      option2: false,
      option3: false,
    });

    const handleChange = (option: keyof typeof checkedItems) => {
      setCheckedItems((prev) => ({ ...prev, [option]: !prev[option] }));
    };

    return (
      <div className="space-y-2">
        {Object.entries(checkedItems).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              id={key}
              checked={value}
              onCheckedChange={() => {
                handleChange(key as keyof typeof checkedItems);
              }}
            />
            <label htmlFor={key}>{key}</label>
          </div>
        ))}
        <p>
          Selected:{' '}
          {Object.entries(checkedItems)
            .filter(([_, v]) => v)
            .map(([k]) => k)
            .join(', ')}
        </p>
      </div>
    );
  },
};
