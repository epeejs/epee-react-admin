import _ from 'lodash';
import React from 'react';
import { Redirect, RouteComponentProps, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';

export enum Roles {
  /** 游客 */
  Guest = 'Guest',
  /** 超级管理员 */
  SuperAdmin = 'SuperAdmin',
  /** 普通管理员 */
  Admin = 'Admin',
  /** 操作账号 */
  User = 'User',
}
export interface RouteNode {
  path: string;
  name?: string;
  /** 重定向不能与布局组件同时使用，同时使用时会忽略重定向（可以通过布局组件内部处理解决） */
  redirect?: string;
  /** 菜单布局组件会使用 */
  hideInMenu?: boolean;
  /** 是否是布局组件（默认 `false`）  */
  layout?: boolean;
  /** 当 `layout` 为 `true` 时，该组件会作为布局组件，接收 `router` (routes 别名) 及其它属性值，*/
  component?: React.ComponentType<any>;
  routes?: RouteNode[];
  /** 授权 */
  authority?: Roles[];
  /** 预留自定义属性 */
  [otherProp: string]: any;
}
export type RouterLayoutType = RouterLayoutProps & RouteComponentProps;

interface RouterLayoutProps {
  router: RouteNode[];
}

export default function RouterLayout({ router }: RouterLayoutProps) {
  return (
    <Switch>
      {router.map(
        ({ path, routes, layout, component, redirect, ...otherProps }) => {
          if (layout && !_.isEmpty(routes) && component) {
            return (
              <PrivateRoute
                key={path}
                path={path}
                render={props => {
                  return React.createElement(component, {
                    router: routes,
                    ...otherProps,
                    ...props,
                  });
                }}
                {...otherProps}
              />
            );
          }

          return (
            <PrivateRoute
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
        },
      )}
    </Switch>
  );
}
