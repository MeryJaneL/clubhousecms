// YourComponent.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import MuiExampleBundle from '../bundles/MuiExample.bundle';

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'MuiExampleBundle',
  component: MuiExampleBundle,
} as ComponentMeta<typeof MuiExampleBundle>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof MuiExampleBundle> = (args) => <MuiExampleBundle {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
