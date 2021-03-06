import React from 'react';
import { Story } from '@storybook/react';
import ToggleableCommentsList, {
  ToggleableCommentsListProps
} from './ToggleableCommentsList';

export default {
  component: ToggleableCommentsList
};

const Template: Story<ToggleableCommentsListProps> = (args) => (
  <ToggleableCommentsList {...args} />
);

export const Empty: Story<ToggleableCommentsListProps> = Template.bind({});
Empty.args = {
  title: 'Some post that was published',
  slug: 'some-post-that-was-published',
  comments: []
};

export const WithComments: Story<ToggleableCommentsListProps> = Template.bind(
  {}
);
WithComments.args = {
  ...Empty.args,
  comments: [
    {
      id: '9a1be8e7-f2ad-4123-b233-fb2b32d5c56f',
      author: 'John Doe',
      text: 'Blah blah blah...',
      publishedAt: new Date(2021, 12, 17, 14, 24, 15)
    },
    {
      id: '65b9654a-876c-4293-ac2e-6fe5fdc94b67',
      author: 'Jane Dean',
      text: 'Blah blah blah...',
      publishedAt: new Date(2022, 1, 3, 10, 14, 0)
    },
    {
      id: '7612a3be-8629-4690-9240-5269fd0c1c71',
      author: 'Anthony Third',
      text:
        'Max length comment: Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Mauris laoreet turpis in tristique mollis. Maecenas et libero magna. ' +
        'Aenean nec erat venenatis, cursus velit at, volutpat sem. Sed varius lorem ut augue ornare pulvinar. ' +
        'Donec mattis pharetra neque, non sollicitudin risus suscipit in. ' +
        'Suspendisse fringilla pretium lobortis. Nunc a hendrerit massa, sed rutrum sem. ' +
        'Maecenas elementum rhoncus ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Mauris laoreet turpis in tristique mollis. Maecenas et libero magna. ' +
        'Aenean nec erat venenatis, cursus velit at, volutpat sem. Sed varius lorem ut augue ornare pulvinar. ' +
        'Donec mattis pharetra neque, non sollicitudin risus suscipit in. Suspendisse fringilla pretium lobortis. ' +
        'Nunc a hendrerit massa, sed rutrum sem. Maecenas elementum rhoncus ultrices. ' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris laoreet turpis in tristique mollis. ' +
        'Maecenas et libero magna. Aenean nec erat venenatis, cursus v.',
      publishedAt: new Date(2021, 6, 12, 18, 8, 0)
    },
    {
      id: '2ca129ef-abc6-4389-937c-37e2fd03c138',
      author: 'Tabitha Luck',
      text: 'Blah blah blah...',
      publishedAt: new Date(2020, 1, 12, 6, 13, 0)
    }
  ]
};
