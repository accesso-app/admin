import { createStore } from 'effector';
import { createHatch } from 'framework';

import { LocalUser } from './common';

export const hatch = createHatch();

export const $user = createStore<LocalUser | null>(null);
