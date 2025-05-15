import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { AppCheckbox } from './AppCheckbox';

const meta = {
  title: 'UI/AppCheckbox',
  component: AppCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onChange: { action: 'changed' },
  },
  args: {
    onChange: fn(),
    checked: false,
  },
} satisfies Meta<typeof AppCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    checked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Receive email notifications for important updates',
    checked: false,
  },
};

export const CheckedWithDescription: Story = {
  args: {
    label: 'Auto-save documents',
    description: 'Automatically save your work every 5 minutes',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    checked: true,
    disabled: true,
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary color checkbox',
    color: 'primary',
    checked: false,
  },
};
