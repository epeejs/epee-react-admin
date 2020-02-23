import { Icon, Layout, Menu } from 'antd';
import _ from 'lodash';
import React from 'react';
import { Link, Redirect, Switch } from 'react-router-dom';
import { useStoreState } from 'src/hooks';
import styles from './BasicLayout.module.scss';
import { RouteNode, RouterLayoutType } from './RouterLayout';
import PrivateRoute from './utils/PrivateRoute';

const { Header, Sider, Content } = Layout;
const { SubMenu, Item: MenuItem } = Menu;

function renderMenu(router: RouteNode[]) {
  return router.map(m => {
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

function renderRoute(router: RouteNode[]): any[] {
  return router.map(m => {
    if (!_.isEmpty(m.routes)) {
      return renderRoute(m.routes!);
    }

    const { redirect, path, component, authority } = m;

    return (
      <PrivateRoute
        key={path}
        path={path}
        authority={authority}
        render={props =>
          redirect ? (
            <Redirect to={redirect} />
          ) : (
            component && React.createElement(component, props)
          )
        }
      />
    );
  });
}

interface BasicLayoutProps extends RouterLayoutType {
  child: React.ComponentType<any>;
}

export default function BasicLayout({
  router,
  history,
  location: { pathname },
  child,
}: BasicLayoutProps) {
  const paths = _.dropRight(pathname.split('/'), 1);
  const openKeys = paths.map((m, i) => _.take(paths, i + 1).join('/'));
  const collapseMenu = useStoreState(state => state.globalModel.collapseMenu);

  return (
    <Layout>
      <Sider width={256} collapsed={collapseMenu}>
        <div className={styles.logo}>
          <Link to="/">{window.config.systemName}</Link>
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
        <Header style={{ padding: 0 }}>{React.createElement(child)}</Header>
        <Content>
          <Switch>{_.flattenDeep(renderRoute(router))}</Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
