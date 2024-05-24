import { Meta, StoryObj } from '@storybook/react'
import { ThemeToggle } from './index'
import '../../../app/globals.css'

const meta: Meta<typeof ThemeToggle> = {
  component: ThemeToggle,
  title: 'Common/ThemeToggle',
  tags: ['autodocs'],
  argTypes: {
    // сюда можно пасснуть какие угодно пропсы и storybook всё прочитает
    // control: { type: 'radio' },
    // options: ['options']
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {},
}
