import React from 'react';
import { Story } from '@storybook/react';
import WriteCommentDialog, {
  WriteCommentDialogProps
} from './WriteCommentDialog';

export default {
  component: WriteCommentDialog,
  argTypes: {
    onCommentPosted: { action: 'onCommentPosted' },
    onCancelled: { action: 'onCancelled' }
  }
};

const Template: Story<WriteCommentDialogProps> = (props) => (
  <WriteCommentDialog {...props} />
);

export const Dialog: Story<WriteCommentDialogProps> = Template.bind({});
Dialog.args = {
  open: true
};
