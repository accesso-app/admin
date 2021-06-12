import * as React from 'react';

export const GenericTemplate: React.FC = ({ children }) => (
  <>
    <nav className="navigation">
      <a href="https://effector.now.sh">Effector</a>
      <a href="https://share.effector.dev">Playground</a>
      <a href="https://github.com/sergeysova/cra-template-effector">GitHub</a>
    </nav>
    <main>{children}</main>
  </>
);
