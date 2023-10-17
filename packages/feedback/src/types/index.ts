import type { Event, Primitive } from '@sentry/types';

export type SentryTags = { [key: string]: Primitive } | undefined;

/**
 * NOTE: These types are still considered Beta and subject to change.
 * @hidden
 */
export interface FeedbackEvent extends Event {
  feedback: {
    message: string;
    url: string;
    contact_email?: string;
    name?: string;
    replay_id?: string;
  };
  // TODO: Add this event type to Event
  // type: 'feedback_event';
}

export interface SendFeedbackData {
  feedback: {
    message: string;
    url: string;
    email?: string;
    replay_id?: string;
    name?: string;
  };
}

export interface FeedbackFormData {
  message: string;
  email?: string;
  name?: string;
}

export interface FeedbackConfigurationWithDefaults {
  /**
   * id to use for the main widget container (this will host the shadow DOM)
   */
  id: string;

  /**
   * DOM Selector to attach click listener to, for opening Feedback dialog.
   */
  attachTo: Node | string | null;

  /**
   * Auto-inject default Feedback actor button to the DOM when integration is
   * added.
   */
  autoInject: boolean;

  /**
   * If true, will not collect user data (email/name).
   */
  isAnonymous: boolean;

  /**
   * Should the email field be required?
   */
  isEmailRequired: boolean;

  /**
   * Should the name field be required?
   */
  isNameRequired: boolean;

  /**
   * Should the email input field be visible? Note: email will still be collected if set via `Sentry.setUser()`
   */
  showEmail: boolean;

  /**
   * Should the name input field be visible? Note: name will still be collected if set via `Sentry.setUser()`
   */
  showName: boolean;

  /**
   * Fill in email/name input fields with Sentry user context if it exists.
   * The value of the email/name keys represent the properties of your user context.
   */
  useSentryUser: {
    email: string;
    name: string;
  };

  // * Color theme customization * //
  /**
   * The colorscheme to use. "system" will choose the scheme based on the user's system settings
   */
  colorScheme: 'system' | 'light' | 'dark';

  /**
   * Theme customization, will be merged with default theme values.
   */
  theme: {
    dark: FeedbackTheme;
    light: FeedbackTheme;
  };
  // * End of Color theme customization * //

  // * Text customization * //
  /**
   * The label for the Feedback widget button that opens the dialog
   */
  buttonLabel: string;
  /**
   * The label for the Feedback form cancel button that closes dialog
   */
  cancelButtonLabel: string;
  /**
   * The label for the Feedback form submit button that sends feedback
   */
  submitButtonLabel: string;
  /**
   * The title of the Feedback form
   */
  formTitle: string;
  /**
   * Label for the email input
   */
  emailLabel: string;
  /**
   * Placeholder text for Feedback email input
   */
  emailPlaceholder: string;
  /**
   * Label for the message input
   */
  messageLabel: string;
  /**
   * Placeholder text for Feedback message input
   */
  messagePlaceholder: string;
  /**
   * Label for the name input
   */
  nameLabel: string;
  /**
   * Placeholder text for Feedback name input
   */
  namePlaceholder: string;
  /**
   * Message after feedback was sent successfully
   */
  successMessageText: string;
  // * End of text customization * //

  // * Start of Callbacks * //
  /**
   * Callback when dialog is opened
   */
  onDialogOpen?: () => void;

  /**
   * Callback when widget actor is clicked
   */
  onActorClick?: () => void;

  /**
   * Callback when feedback is successfully submitted
   */
  onSubmitSuccess?: () => void;

  /**
   * Callback when feedback is unsuccessfully submitted
   */
  onSubmitError?: () => void;
  // * End of Callbacks * //
}

export interface FeedbackTheme {
  /**
   * Font family for widget
   */
  fontFamily: string;
  /**
   * Font size for widget
   */
  fontSize: string;
  /**
   * Background color for actor and dialog
   */
  background: string;
  /**
   * Background color on hover
   */
  backgroundHover: string;
  /**
   * Border styling for actor and dialog
   */
  border: string;
  /**
   * Box shadow for actor and dialog
   */
  boxShadow: string;
  /**
   * Foreground color (i.e. text color)
   */
  foreground: string;
  /**
   * Success color
   */
  success: string;
  /**
   * Error color
   */
  error: string;
}

export interface FeedbackThemes {
  dark: FeedbackTheme;
  light: FeedbackTheme;
}

export interface FeedbackComponent<T extends HTMLElement> {
  $el: T;
}
