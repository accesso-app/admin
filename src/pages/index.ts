import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { routes } from './routes';

export const Pages: React.FC = () => renderRoutes(routes);
