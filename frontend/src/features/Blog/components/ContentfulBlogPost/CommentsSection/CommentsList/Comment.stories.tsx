import React from 'react';
import { Story } from '@storybook/react';
import Comment, { CommentProps } from './Comment';

export default {
  component: Comment
};

const Template: Story<CommentProps> = (args) => <Comment {...args} />;

export const Basic: Story<CommentProps> = Template.bind({});
Basic.args = {
  comment: {
    author: 'John Doe',
    text: 'This is a comment stating something about the content being commented',
    publishedAt: new Date()
  }
};
