import { Meta, StoryObj } from '@storybook/react'
import Spinner from './index'

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: 'Common/Spinner',
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
