import React from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { ToastDurationInMilliseconds } from '../constants';

const doNothing = () => {};

export type ToastProps = {
  open?: boolean;
  onDismissed?: () => void;
  message: string;
  severity: AlertColor;
};
const Toast = ({
  open = false,
  onDismissed = doNothing,
  message,
  severity
}: ToastProps): JSX.Element => (
  <Snackbar
    open={open}
    autoHideDuration={ToastDurationInMilliseconds}
    onClose={onDismissed}
  >
    <Alert onClose={onDismissed} severity={severity} variant="filled">
      {message}
    </Alert>
  </Snackbar>
);

export default Toast;
