import * as React from 'react';

import * as model from './model';

export const LoginPage: React.FC = () => {
  React.useEffect(() => model.pageMounted(), []);

  return <div>Login</div>;
};
