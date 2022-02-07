/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  Typography
} from '@mui/material';
import { Button } from 'gatsby-theme-material-ui';
import { useForm } from 'react-hook-form';
import api from '../../api';
import Toast from '../../../../components/Toast';
import { useConfirmableActionWithResultNotification } from '../../../../hooks';

type Post = {
  slug: string;
};
const defaultValues: Post = {
  slug: ''
};
const Index = (): JSX.Element => {
  const [shouldReset, setShouldReset] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Post>({
    defaultValues
  });

  useEffect(() => {
    if (!shouldReset) {
      return;
    }

    reset(defaultValues);
    setShouldReset(false);
  }, [reset, setShouldReset, shouldReset]);

  const [slugToRegister, setSlugToRegister] = useState<string | undefined>(
    undefined
  );

  const registerPost = useCallback(async () => {
    if (!slugToRegister) {
      return;
    }

    await api.registerPost(slugToRegister);
  }, [slugToRegister]);

  const clear = useCallback(() => {
    setSlugToRegister(undefined);
    reset(defaultValues);
  }, [setSlugToRegister, reset]);

  const [show, handle] = useConfirmableActionWithResultNotification({
    actionToConfirm: registerPost,
    onSuccess: clear
  });

  const handleRegisterClicked = handleSubmit((post: Post) => {
    setSlugToRegister(post.slug);
    handle.confirmationRequested();
  });

  return (
    <Box
      sx={{
        height: '70vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant="h4" align="center" color="primary">
        Register a blog post
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TextField
          placeholder="Blog post slug"
          error={!!errors.slug}
          helperText={errors.slug?.message}
          {...register('slug', {
            required: 'Slug is required',
            minLength: {
              value: 3,
              message: 'This slug is too short'
            },
            maxLength: {
              value: 100,
              message: 'This slug is too long'
            },
            pattern: {
              value: /^([a-z0-9-]+)$/,
              message: 'This is not a slug'
            }
          })}
        />
        <Divider orientation="horizontal" sx={{ mx: 1 }} />
        <Button onClick={handleRegisterClicked}>Register</Button>
      </Box>

      <Dialog open={show.confirmationPrompt}>
        <DialogContent>
          <DialogTitle>Register post?</DialogTitle>
          <DialogContentText id="alert-dialog-description">
            Do you want to register slug {slugToRegister}?
          </DialogContentText>
          <DialogActions>
            <Button onClick={handle.confirmed}>Register</Button>
            <Button onClick={handle.cancelled}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Toast
        open={show.successNotification}
        message="Post registered successfully"
        severity="success"
        onDismissed={handle.successDismissed}
      />
      <Toast
        open={show.failureNotification}
        message="Failed registering post"
        severity="error"
        onDismissed={handle.failureDismissed}
      />
    </Box>
  );
};

export default Index;
