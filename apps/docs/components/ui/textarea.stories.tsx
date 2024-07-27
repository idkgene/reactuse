import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible textarea component with customizable styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    rows: { control: 'number' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here.',
  },
};

export const WithRows: Story = {
  args: {
    placeholder: 'This textarea has 5 rows.',
    rows: 5,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This textarea is disabled.',
    disabled: true,
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'This is some default text in the textarea.',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="space-y-2">
      <label htmlFor="message" className="text-sm font-medium">
        Your message
      </label>
      <Textarea id="message" {...args} />
    </div>
  ),
  args: {
    placeholder: 'Type your message here.',
  },
};

export const WithCharacterCount: Story = {
  render: function TextareaWithCharCount() {
    const [value, setValue] = React.useState('');
    const maxLength = 100;

    return (
      <div className="space-y-2">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
          placeholder="Type your message here."
        />
        <div className="text-sm text-slate-500">
          {value.length}/{maxLength} characters
        </div>
      </div>
    );
  },
};

export const Resizable: Story = {
  args: {
    placeholder: 'This textarea is resizable.',
    className: 'resize-y',
  },
};

export const WithValidation: Story = {
  render: function TextareaWithValidation() {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      if (e.target.value.length < 10) {
        setError('Message must be at least 10 characters long.');
      } else {
        setError('');
      }
    };

    return (
      <div className="space-y-2">
        <Textarea
          value={value}
          onChange={handleChange}
          placeholder="Type at least 10 characters."
          className={error ? 'border-red-500' : ''}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
};
