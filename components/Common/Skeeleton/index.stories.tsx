import type { Meta, StoryObj } from '@storybook/react'
import Skeleton from './index'
import '../../../app/globals.css'

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: 'Common/Skeleton',
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'text' },
    },
    height: {
      control: { type: 'text' },
    },
    boxHeight: {
      control: { type: 'text' },
    },
    pill: {
      control: { type: 'boolean' },
    },
    rounded: {
      control: { type: 'boolean' },
    },
    squared: {
      control: { type: 'boolean' },
    },
    animated: {
      control: { type: 'boolean' },
    },
    show: {
      control: { type: 'boolean' },
    },
    className: {
      control: { type: 'text' },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: '100%',
    height: 'auto',
    boxHeight: undefined,
    pill: false,
    rounded: false,
    squared: false,
    animated: true,
    show: true,
    className: undefined,
  },
}

export const Pill: Story = {
  args: {
    width: 48,
    pill: true,
  },
}

export const Rounded: Story = {
  args: {
    width: 48,
    height: 48,
    boxHeight: 48,
    rounded: true,
  },
}

export const Squared: Story = {
  args: {
    width: 48,
    height: 48,
    boxHeight: 48,
    squared: true,
  },
}

export const NoAnimation: Story = {
  args: {
    width: '100%',
    height: 100,
    animated: false,
    children: null,
  },
}

export const WithChildren: Story = {
  args: {
    width: '100%',
    height: 100,
    children: <button>Button</button>,
  },
}
