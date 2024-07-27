import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable calendar component based on react-day-picker with shadcn styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
      description: 'The selection mode of the calendar',
    },
    selected: {
      control: 'date',
      description: 'The selected date(s)',
    },
    onSelect: { action: 'selected' },
    disabled: {
      control: 'object',
      description: 'Disabled date(s)',
    },
    footer: {
      control: 'text',
      description: 'Footer content',
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Show days from previous/next month',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'single',
  },
};

export const RangeSelection: Story = {
  args: {
    mode: 'range',
  },
};

export const HideOutsideDays: Story = {
  args: {
    mode: 'single',
    showOutsideDays: false,
  },
};

export const CustomStyles: Story = {
  args: {
    className: 'border rounded-lg shadow-lg',
    classNames: {
      day_selected: 'bg-blue-500 text-white',
    },
  },
};
