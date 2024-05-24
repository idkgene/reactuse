import { Meta, StoryObj } from '@storybook/react'
import { TableOfContents } from './index'
import '../../../app/globals.css'

const meta: Meta<typeof TableOfContents> = {
  component: TableOfContents,
  title: 'Common/TableOfContents',
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
