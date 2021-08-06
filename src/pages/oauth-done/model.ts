import { sample } from 'effector';
import { PATHS } from '../paths';
import { $session } from '../../features/session';
import { oauthDone } from '../../api';
import { historyPush } from '../../features/navigation';
import { hatch } from './contract';

sample({
  source: hatch.enter,
  target: oauthDone,
  fn: (source) => {
    return {
      authorizationCode: source.query.code,
    };
  },
});

sample({
  source: oauthDone.doneData,
  target: $session,
  fn: (source: any) => {
    return {
      firstName: source.firstName,
      lastName: source.lastName,
    };
  },
});

sample({
  source: oauthDone.doneData,
  target: historyPush.prepend(PATHS.home),
});
