import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import './main.css';

import { history } from '../entities/navigation';
import { Pages } from '../pages';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Pages />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
