import { createEffect } from 'effector';

export interface AuthSettings {
  redirectUri: string;
  clientId: string;
  scope: string;
}

export const loadAuthSettingsFx = createEffect<void, AuthSettings, void>({
  async handler() {
    return {
      redirectUri: 'http://localhost:8080/oauth-done',
      clientId: '00000000-0000-4000-acce-0000000000ad',
      scope: '',
    };
  },
});
