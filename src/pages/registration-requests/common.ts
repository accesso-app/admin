export type RequestStatus =
  | 'new' // Nothing changed yet
  | 'pending'
  | 'done'
  | 'invalid' // Local validation failed
  | 'error'; // Remove validation failed
