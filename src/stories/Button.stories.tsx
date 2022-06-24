import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from '../components/Button/Button';

export default {
  title: 'Example/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const DeleteLight = Template.bind({});
DeleteLight.args = {
  theme: 'light',
  title: 'delete',
};
export const DeleteDark = Template.bind({});
DeleteDark.args = {
  theme: 'dark',
  title: 'delete',
};

export const CancelLight = Template.bind({});
CancelLight.args = {
  theme: 'dark',
  title: 'cancel',
};
export const CancelDark = Template.bind({});
CancelDark.args = {
  theme: 'light',
  title: 'cancel',
};
