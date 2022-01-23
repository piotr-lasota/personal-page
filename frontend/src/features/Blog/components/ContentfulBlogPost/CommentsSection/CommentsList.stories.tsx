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
      id: '60caf014-2ae0-4ed6-ab91-bfa162fd5bda',
      author: 'John Doe',
      text: 'This is a comment stating something about the content being commented',
      publishedAt: new Date('2021-10-12T13:15:00')
    },
    {
      id: 'c3a105fa-cd62-4da2-9a33-b049311efc44',
      author: 'Jane Dean',
      text: 'This is another comment stating something about the content being commented',
      publishedAt: new Date('2021-10-12T12:10:00')
    },
    {
      id: '4169dd5c-5715-4d3e-a959-5e95e847b0ac',
      author: 'Andy Beck',
      text: 'This is yet another comment stating something about the content being commented',
      publishedAt: new Date('2021-10-10T13:15:00')
    }
  ]
};
