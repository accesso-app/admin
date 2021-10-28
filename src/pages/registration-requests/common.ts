import { RegisterRequest } from '~/shared/api';

export type RequestStatus =
  | 'new' // Nothing changed yet
  | 'pending'
  | 'done'
  | 'invalid' // Local validation failed
  | 'error'; // Remove validation failed

export type LocalRegisterRequest = RegisterRequest & { new: boolean };
