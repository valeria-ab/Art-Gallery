import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DeleteModal } from '../components/Modals/delete/DeleteModal';

export default {
  title: 'Example/DeleteModal',
  component: DeleteModal,
} as ComponentMeta<typeof DeleteModal>;

const Template: ComponentStory<typeof DeleteModal> = (args) => <DeleteModal {...args} />;

export const DeleteArtistProfile = Template.bind({});
DeleteArtistProfile.args = {
  primaryTitle: 'artist profile',
  secondaryTitle: 'profile',
  theme: 'light',
};

export const DeletePicture = Template.bind({});
DeletePicture.args = {
  primaryTitle: 'picture',
  secondaryTitle: 'picture',
  theme: 'light',
};
