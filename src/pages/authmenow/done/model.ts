import { createEvent } from 'effector';

interface Loaded {
  code?: string;
  state?: string;
  error?: string;
}

export const pageLoaded = createEvent<Loaded>();

pageLoaded.watch((query) => {
  console.info('PAGE LOADED', query);
});
