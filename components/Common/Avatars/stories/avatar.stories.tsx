import { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '../src/avatar'
import '../../../app/globals.css'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Common/Avatar',
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {},
}
