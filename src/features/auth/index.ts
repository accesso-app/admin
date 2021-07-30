import { createEffect } from 'effector';

export interface OAuthSettings {
  redirectUri: string;
  clientId: string;
  scope: string | null | undefined;
  responseType: string;
}

export const loadAuthSettingsFx = createEffect<void, OAuthSettings, void>({
  async handler() {
    return {
      redirectUri: 'http://localhost:8080/oauth-done',
      clientId: '00000000-0000-4000-acce-0000000000ad',
      scope: '',
      responseType: 'code',
    };
  },
});
