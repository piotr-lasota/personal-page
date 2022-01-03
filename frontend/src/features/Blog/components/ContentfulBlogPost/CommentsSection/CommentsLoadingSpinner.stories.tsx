import React from 'react';
import { Story } from '@storybook/react';
import CommentsLoadingSpinner from './CommentsLoadingSpinner';

export default {
  component: CommentsLoadingSpinner
};

const Template: Story = (args) => <CommentsLoadingSpinner {...args} />;

export const Basic: Story = Template.bind({});
