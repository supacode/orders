import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppPopover } from './AppPopover';

const meta = {
  title: 'UI/AppPopover',
  component: AppPopover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
    },
    contentClassName: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof AppPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: 'Click me',
    children: 'This is the content inside the popover.',
  },
};

export const WithCustomTrigger: Story = {
  args: {
    trigger: 'Custom Trigger',
    children: 'This popover uses a custom trigger element.',
  },
};

export const WithCustomStyling: Story = {
  args: {
    trigger: 'Styled Popover',
    className: 'inline-block',
    contentClassName: 'bg-gray-800 text-white border-gray-600',
    children: 'This popover has custom dark styling.',
  },
};
