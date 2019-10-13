import { Icon, Layout, Menu } from 'antd';
import _ from 'lodash';
import React from 'react';
import {
  Link,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import styles from './BasicLayout.module.scss';

const { Header, Sider, Content } = Layout;
const { SubMenu, Item: MenuItem } = Menu;

export interface RouterNode {
  path: string;
  name?: string;
  icon?: string;
  redirect?: string;
  hideInMenu?: boolean;
  /** 是否是布局组件 */
  layout?: boolean;
  component?: React.ComponentType<any>;
  routes?: RouterNode[];
}

function renderMenu(nodes: RouterNode[]) {
  return nodes.map(m => {
    if (m.hideInMenu) {
      return null;
    }
    if (!_.isEmpty(m.routes)) {
      return (
        <SubMenu
          key={m.path}
          title={
            <span>
              {m.icon && <Icon type={m.icon} />}
              <span>{m.name}</span>
            </span>
          }
        >
          {renderMenu(m.routes!)}
        </SubMenu>
      );
    }

    return (
      <MenuItem key={m.path}>
        {m.icon && <Icon type={m.icon} />}
        <span>{m.name}</span>
      </MenuItem>
    );
  });
}

function renderRoute(menu: RouterNode[]): any[] {
  return menu.map(m => {
    if (!_.isEmpty(m.routes)) {
      return renderRoute(m.routes!);
    }

    const { redirect, path, component } = m;

    return (
      <Route
        key={path}
        path={path}
        // eslint-disable-next-line react/display-name
        component={redirect ? () => <Redirect to={redirect} /> : component}
      />
    );
  });
}

interface BasicLayoutProps extends RouteComponentProps {
  router: RouterNode[];
  collapsed?: boolean;
  children?: React.ReactNode;
}

export default function BasicLayout({
  router,
  history,
  location: { pathname },
  children,
  collapsed = false,
}: BasicLayoutProps) {
  const paths = _.dropRight(pathname.split('/'), 1);
  const openKeys = paths.map((m, i) => _.take(paths, i + 1).join('/'));

  return (
    <Layout>
      <Sider width={256} collapsed={collapsed}>
        <div className={styles.logo}>
          <Link to="/"> {window.config.systemName}</Link>
        </div>
        {pathname !== '/' && (
          <Menu
            mode="inline"
            theme="dark"
            defaultOpenKeys={openKeys}
            selectedKeys={[pathname]}
            onSelect={param => history.push(param.key)}
          >
            {renderMenu(router)}
          </Menu>
        )}
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>{children}</Header>
        <Content>
          <Switch>{_.flattenDeep(renderRoute(router))}</Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
