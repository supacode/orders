import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { AppButton } from './AppButton';

const meta = {
  title: 'UI/AppButton',
  component: AppButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'ghost'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'solid',
    color: 'secondary',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'solid',
    color: 'danger',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    color: 'primary',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'solid',
    color: 'primary',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'solid',
    color: 'primary',
    size: 'lg',
  },
};

export const WithStartContent: Story = {
  args: {
    children: 'Button with Icon',
    startContent: '🚀',
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
};

export const WithEndContent: Story = {
  args: {
    children: 'Button with Icon',
    endContent: '→',
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
};
