import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from '@storybook/react';

import PhotoItem from '../components/PhotoItem/PhotoItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/PhotoItem',
  component: PhotoItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PhotoItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PhotoItem> = (args) => <PhotoItem {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  name: 'Vincent van Gogh',
  yearsOfLife: '30 March 1853 – 29 July 1890',
  picture: 'string',
  id: 'string',
  theme: 'dark',
};

export const Secondary = Template.bind({});
Secondary.args = {
  name: 'Vincent van Gogh',
  yearsOfLife: '30 March 1853 – 29 July 1890',
  picture: 'string',
  id: 'string',
  theme: 'dark',
};

export const Large = Template.bind({});
Large.args = {
  name: 'Vincent van Gogh',
  yearsOfLife: '30 March 1853 – 29 July 1890',
  picture: 'string',
  id: 'string',
  theme: 'dark',
};

export const Small = Template.bind({});
Small.args = {
  name: 'Vincent van Gogh',
  yearsOfLife: '30 March 1853 – 29 July 1890',
  picture: 'string',
  id: 'string',
};
