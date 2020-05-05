import * as React from 'react';
import './generic.css';
import { Link } from 'react-router-dom';
import { paths } from 'pages/paths';

export const GenericTemplate: React.FC = ({ children }) => (
  <>
    <nav className="navigation">
      <Link to={paths.home()}>Home</Link>
    </nav>
    <main>{children}</main>
  </>
);
