import type { Meta, StoryObj } from '@storybook/react-vite';

import { Table } from './AppTable';

const meta = {
  title: 'UI/AppTable',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Table component with actual data',
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'border-2 border-blue-500',
    children: 'Table with custom styling',
  },
};
