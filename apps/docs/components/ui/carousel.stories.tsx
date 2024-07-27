import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './carousel';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable carousel component based on embla-carousel-react.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the carousel',
    },
    opts: {
      control: 'object',
      description: 'Options for embla-carousel',
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

function CarouselDemo(args: any) {
  return (
    <Carousel {...args} className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center rounded-md bg-slate-100 p-6">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export const Default: Story = {
  render: CarouselDemo,
};

export const Vertical: Story = {
  render: CarouselDemo,
  args: {
    orientation: 'vertical',
  },
};

export const MultipleSlides: Story = {
  render: (args) => (
    <Carousel {...args} className="w-full max-w-sm">
      <CarouselContent className="-ml-2 md:-ml-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
          >
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center rounded-md bg-slate-100 p-6">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  args: {
    opts: { slidesToScroll: 1, align: 'start' },
  },
};
