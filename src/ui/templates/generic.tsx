import * as React from 'react';
import './generic.css';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { paths } from 'pages/paths';

export const GenericTemplate: React.FC = ({ children }) => (
  <Layout>
    <Layout.Header>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item>
          <Link to={paths.home()}>Home</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
    <Layout.Content style={{ justifyContent: 'center' }}>
      {children}
    </Layout.Content>
  </Layout>
);
