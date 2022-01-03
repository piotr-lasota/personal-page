import React from 'react';
import { Story } from '@storybook/react';
import CommentsList, { CommentsListContainerProps } from './CommentsList';

export default {
  component: CommentsList
};

const Template: Story<CommentsListContainerProps> = (args) => (
  <CommentsList {...args} />
);

export const Empty: Story<CommentsListContainerProps> = Template.bind({});
Empty.args = {
  comments: []
};

export const Some: Story<CommentsListContainerProps> = Template.bind({});
Some.args = {
  comments: [
    {
      author: 'John Doe',
      text: 'This is a comment stating something about the content being commented',
      publishedAt: new Date('2021-10-12T13:15:00')
    },
    {
      author: 'Jane Dean',
      text: 'This is another comment stating something about the content being commented',
      publishedAt: new Date('2021-10-12T12:10:00')
    },
    {
      author: 'Andy Beck',
      text: 'This is yet another comment stating something about the content being commented',
      publishedAt: new Date('2021-10-10T13:15:00')
    }
  ]
};
