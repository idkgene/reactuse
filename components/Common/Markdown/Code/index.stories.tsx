import { Meta, StoryObj } from '@storybook/react'
import Code from './index'

const meta: Meta<typeof Code> = {
  component: Code,
  title: 'Common/Code',
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
