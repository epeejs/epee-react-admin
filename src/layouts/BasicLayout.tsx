import { Divider, Layout, Menu } from 'antd';
import _ from 'lodash';
import React from 'react';
import {
  Link,
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
  Switch,
} from 'react-router-dom';
import styles from './BasicLayout.module.scss';

const { Header, Content } = Layout;
const { Item: MenuItem } = Menu;

export type RouteType = Pick<RouteProps, 'exact' | 'strict'> &
  Pick<RouterNode, 'path' | 'name' | 'redirect' | 'component'>;
export interface RouterNode {
  path: string;
  name?: string;
  redirect?: string;
  hideInMenu?: boolean;
  /** 是否是布局组件 */
  layout?: boolean;
  component?: React.ComponentType<any>;
  routes?: RouteType[];
}

interface BasicLayoutProps extends RouteComponentProps {
  router: RouterNode[];
  children?: React.ReactNode;
}

export default function BasicLayout({
  router,
  history,
  location: { pathname },
  children,
}: BasicLayoutProps) {
  const openKey = '/' + pathname.split('/')[1];

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Link className={styles.logo} to="/" />
          <Divider type="vertical" style={{ height: 20 }} />
          <span>{window.config.systemName}</span>
        </div>
        <div className={styles.right}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[openKey]}
            style={{ lineHeight: '64px' }}
            onSelect={param => {
              const item = router.find(m => m.path === param.key && m.redirect);

              // need redirect
              if (item) {
                history.push(item.redirect!);
              } else {
                history.push(param.key);
              }
            }}
          >
            {router
              .filter(m => !m.hideInMenu)
              .map(m => (
                <MenuItem key={m.path}>{m.name}</MenuItem>
              ))}
          </Menu>
          {children}
        </div>
      </Header>
      <Content>
        <Switch>
          {router
            .map(m => {
              const {
                name,
                hideInMenu,
                path,
                routes,
                layout,
                redirect,
                component: Component,
                ...routeProps
              } = m;

              // handle setting
              if (layout && Component && !_.isEmpty(routes)) {
                return (
                  <Route
                    key={path}
                    path={path}
                    component={(props: RouteComponentProps) => (
                      <Component routes={routes} {...props} />
                    )}
                    {...routeProps}
                  />
                );
              }
              if (!_.isEmpty(routes)) {
                return m.routes!.map(r => <Route key={r.path} {...r} />);
              }

              return (
                <Route
                  key={path}
                  path={path}
                  component={
                    redirect
                      ? // eslint-disable-next-line react/display-name
                        () => <Redirect to={redirect} />
                      : Component
                  }
                  {...routeProps}
                />
              );
            })
            .flat()}
        </Switch>
      </Content>
    </Layout>
  );
}
