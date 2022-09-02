import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from '../components/Button/Button';

export default {
  value: 'Example/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);

export const DeleteLight = Template.bind({});
DeleteLight.args = {
  theme: 'light',
  value: 'delete',
};
export const DeleteDark = Template.bind({});
DeleteDark.args = {
  theme: 'dark',
  value: 'delete',
};

export const CancelLight = Template.bind({});
CancelLight.args = {
  theme: 'dark',
  value: 'cancel',
};
export const CancelDark = Template.bind({});
CancelDark.args = {
  theme: 'light',
  value: 'cancel',
};
