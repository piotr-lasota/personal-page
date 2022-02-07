import { useCallback, useEffect, useMemo, useReducer } from 'react';
import reducer, { initialState } from './reducer';

const doNothing = () => {};

const promiseNothing = () =>
  new Promise<void>((resolve) => {
    resolve();
  });

type VisibilityState = {
  confirmationPrompt: boolean;
  failureNotification: boolean;
  successNotification: boolean;
};

type HandlersState = {
  confirmationRequested: () => void;
  cancelled: () => void;
  confirmed: () => void;
  successDismissed: () => void;
  failureDismissed: () => void;
};

export type UseConfirmableActionWithResultNotificationHook = [
  VisibilityState,
  HandlersState
];
export type UseConfirmableActionWithResultNotificationProps = {
  actionToConfirm?: () => Promise<void>;
  onSuccess?: () => void;
  onFailed?: () => void;
};
const useConfirmableActionWithResultNotification = ({
  actionToConfirm = promiseNothing,
  onSuccess = doNothing,
  onFailed = doNothing
}: UseConfirmableActionWithResultNotificationProps): UseConfirmableActionWithResultNotificationHook => {
  const [
    {
      showConfirmationPrompt,
      showFailureNotification,
      showSuccessNotification,
      actionStatus
    },
    dispatch
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    switch (actionStatus) {
      case 'succeeded':
        onSuccess();
        break;
      case 'failed':
        onFailed();
        break;
      default:
        break;
    }
  }, [actionStatus, onFailed, onSuccess]);

  const handleFailureNotificationDismissed = useCallback(
    () => dispatch('failure-notification-dismissed'),
    [dispatch]
  );

  const handleSuccessNotificationDismissed = useCallback(
    () => dispatch('success-notification-dismissed'),
    [dispatch]
  );

  const handleCancelled = useCallback(
    () => dispatch('confirmation-cancelled'),
    [dispatch]
  );

  const handleConfirmed = useCallback(async () => {
    try {
      dispatch('action-initiated');
      await actionToConfirm();
    } catch {
      dispatch('action-failed');
      return;
    }
    dispatch('action-succeeded');
  }, [actionToConfirm, dispatch]);

  const handleConfirmationRequested = useCallback(
    () => dispatch('confirmation-requested'),
    [dispatch]
  );

  const visibility = useMemo(
    () => ({
      confirmationPrompt: showConfirmationPrompt,
      successNotification: showSuccessNotification,
      failureNotification: showFailureNotification
    }),
    [showConfirmationPrompt, showFailureNotification, showSuccessNotification]
  );

  const handle = useMemo(
    () => ({
      confirmationRequested: handleConfirmationRequested,
      cancelled: handleCancelled,
      confirmed: handleConfirmed,
      successDismissed: handleSuccessNotificationDismissed,
      failureDismissed: handleFailureNotificationDismissed
    }),
    [
      handleCancelled,
      handleConfirmationRequested,
      handleConfirmed,
      handleFailureNotificationDismissed,
      handleSuccessNotificationDismissed
    ]
  );

  return [visibility, handle];
};

export default useConfirmableActionWithResultNotification;
