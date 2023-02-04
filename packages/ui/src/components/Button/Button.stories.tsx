import type { Meta, StoryObj } from '@storybook/react';

import { Button } from 'theme-ui';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'DeskaideUI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
// export const Primary: Story = {
//   args: {
//     variant: 'primary',
//   },
// };

export const Default: Story = (args) => <Button {...args}>Button</Button>;

Default.args = {
  variant: 'default',
};

export const Primary: Story = (args) => <Button {...args}>Button</Button>;

Primary.args = {
  variant: 'primary',
};

export const Secondary: Story = (args) => <Button {...args}>Button</Button>;

Secondary.args = {
  variant: 'secondary',
};

export const Warning = (args) => <Button {...args}>Button</Button>;

Warning.args = {
  variant: 'warning',
};

export const Destructive: Story = (args) => <Button {...args}>Button</Button>;

Destructive.args = {
  variant: 'destructive',
};
