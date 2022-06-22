import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from '../components/Button/Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  theme: 'light',
  title: 'Save',
};

export const Secondary = Template.bind({});
Secondary.args = {
  theme: 'light',
  title: 'Delete',
};

export const Large = Template.bind({});
Large.args = {
  theme: 'dark',
  title: 'Save',
};

export const Small = Template.bind({});
Small.args = {
  theme: 'dark',
  title: 'Delete',
};
