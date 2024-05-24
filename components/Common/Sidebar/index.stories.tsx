import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './index'
import '../../../app/globals.css'

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: 'Common/Sidebar',
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
  args: {
    // здесь можно пасснуть какие угодно пропсы и storybook всё прочитает
  },
}
