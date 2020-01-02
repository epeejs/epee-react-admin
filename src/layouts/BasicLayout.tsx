import { Divider, Layout, Menu } from 'antd';
import _ from 'lodash';
import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import styles from './BasicLayout.module.scss';
import { RouterLayoutType } from './RouterLayout';

const { Header, Content } = Layout;
const { Item: MenuItem } = Menu;

interface BasicLayoutProps extends RouterLayoutType {
  child: React.ComponentType<any>;
}

export default function BasicLayout({
  router,
  history,
  location: { pathname },
  child,
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
          {React.createElement(child)}
        </div>
      </Header>
      <Content>
        <Switch>
          {router.map(m => {
            const {
              name,
              hideInMenu,
              path,
              routes,
              layout,
              redirect,
              component,
              ...otherProps
            } = m;

            // handle layout
            if (layout && component && !_.isEmpty(routes)) {
              return (
                <Route
                  key={path}
                  path={path}
                  render={props =>
                    React.createElement(component, { router: routes, ...props })
                  }
                  {...otherProps}
                />
              );
            }
            if (routes && !_.isEmpty(routes)) {
              return routes.map(n => <Route key={n.path} {...n} />);
            }

            return (
              <Route
                key={path}
                path={path}
                render={props =>
                  redirect ? (
                    <Redirect to={redirect} />
                  ) : (
                    component && React.createElement(component, props)
                  )
                }
                {...otherProps}
              />
            );
          })}
        </Switch>
      </Content>
    </Layout>
  );
}
