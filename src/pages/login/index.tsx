import * as React from 'react';
import { Button } from 'antd';

import * as model from './model';

export const LoginPage: React.FC = () => {
  React.useEffect(() => model.pageMounted(), []);
  const login = React.useCallback(() => model.loginClicked(), []);

  return (
    <div>
      <h1>Login</h1>
      <Button onClick={login} type="primary" size="large">
        Login with Authmenow
      </Button>
    </div>
  );
};
