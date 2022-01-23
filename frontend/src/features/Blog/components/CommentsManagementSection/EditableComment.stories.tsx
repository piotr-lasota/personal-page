import React, { useState } from 'react';
import { Story } from '@storybook/react';
import EditableComment, { EditableCommentProps } from './EditableComment';

export default {
  component: EditableComment
};

const Template: Story<EditableCommentProps> = (args) => {
  const [isToggled, setIsToggled] = useState(false);

  const argsToRender: EditableCommentProps = {
    ...args,
    isToggled,
    onToggleClicked: (_, toggled) => setIsToggled(toggled)
  };

  return <EditableComment {...argsToRender} />;
};
export const Empty: Story<EditableCommentProps> = Template.bind({});
Empty.args = {
  isToggled: false,
  comment: {
    id: '9a1be8e7-f2ad-4123-b233-fb2b32d5c56f',
    author: 'John Doe',
    text: 'Blah blah blah...',
    publishedAt: new Date(2021, 12, 17, 14, 24, 15)
  }
};

export const Long: Story<EditableCommentProps> = Template.bind({});
Long.args = {
  ...Empty.args,
  comment: {
    id: '7612a3be-8629-4690-9240-5269fd0c1c71',
    author: 'Anthony Third',
    publishedAt: new Date(),
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
      'Maecenas et libero magna. Aenean nec erat venenatis, cursus v.'
  }
};
