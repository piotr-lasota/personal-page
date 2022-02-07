type ActionStatus = 'not-initiated' | 'in-progress' | 'failed' | 'succeeded';

type State = {
  showConfirmationPrompt: boolean;
  showSuccessNotification: boolean;
  showFailureNotification: boolean;
  actionStatus: ActionStatus;
};

type Action =
  | 'confirmation-cancelled'
  | 'confirmation-requested'
  | 'action-initiated'
  | 'action-succeeded'
  | 'action-failed'
  | 'failure-notification-dismissed'
  | 'success-notification-dismissed';

export const initialState: State = {
  showConfirmationPrompt: false,
  showSuccessNotification: false,
  showFailureNotification: false,
  actionStatus: 'not-initiated'
};

const reducer = (state: State, action: Action): State => {
  switch (action) {
    case 'confirmation-requested':
      return {
        ...state,
        showConfirmationPrompt: true
      };
    case 'confirmation-cancelled':
      return {
        actionStatus: 'not-initiated',
        showConfirmationPrompt: false,
        showFailureNotification: false,
        showSuccessNotification: false
      };
    case 'action-initiated':
      return {
        ...state,
        showConfirmationPrompt: false,
        actionStatus: 'in-progress'
      };
    case 'action-succeeded':
      return {
        ...state,
        showSuccessNotification: true,
        actionStatus: 'succeeded'
      };
    case 'action-failed':
      return {
        ...state,
        showFailureNotification: true,
        actionStatus: 'failed'
      };
    case 'failure-notification-dismissed':
      return { ...state, showFailureNotification: false };
    case 'success-notification-dismissed':
      return { ...state, showSuccessNotification: false };
    default:
      return state;
  }
};

export default reducer;
