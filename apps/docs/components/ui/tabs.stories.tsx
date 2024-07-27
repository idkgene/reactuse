import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A set of layered sections of content, known as tab panels, that display one panel of content at a time.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Make changes to your account here. Click save when you're done.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Change your password here. After saving, you'll be logged out.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithForms: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input id="name" className="w-full mt-1 p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white rounded">
            Save changes
          </button>
        </form>
      </TabsContent>
      <TabsContent value="password">
        <form className="space-y-4">
          <div>
            <label htmlFor="current" className="text-sm font-medium">
              Current password
            </label>
            <input
              id="current"
              type="password"
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="new" className="text-sm font-medium">
              New password
            </label>
            <input
              id="new"
              type="password"
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white rounded">
            Change password
          </button>
        </form>
      </TabsContent>
    </Tabs>
  ),
};
