import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from './resizable';

const meta = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A set of resizable panel components built on top of react-resizable-panels.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalLayout: Story = {
  render: () => (
    <div className="mx-auto h-[400px] max-w-3xl border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center bg-slate-100">
            Panel 1
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center bg-slate-200">
            Panel 2
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center bg-slate-300">
            Panel 3
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const VerticalLayout: Story = {
  render: () => (
    <div className="mx-auto h-[400px] max-w-3xl border">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center bg-slate-100">
            Panel 1
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center bg-slate-200">
            Panel 2
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center bg-slate-300">
            Panel 3
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const WithHandles: Story = {
  render: () => (
    <div className="mx-auto h-[400px] max-w-3xl border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30}>
          <div className="flex h-full items-center justify-center bg-slate-100">
            Panel 1
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40}>
          <div className="flex h-full items-center justify-center bg-slate-200">
            Panel 2
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30}>
          <div className="flex h-full items-center justify-center bg-slate-300">
            Panel 3
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
