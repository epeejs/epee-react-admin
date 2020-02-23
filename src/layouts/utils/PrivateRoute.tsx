import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useStoreState } from 'src/hooks';
import { Roles } from 'src/layouts/RouterLayout';

interface PrivateRouteProps extends RouteProps {
  authority?: Roles[];
}

export default function PrivateRoute({
  authority,
  ...otherProps
}: PrivateRouteProps) {
  const { role } = useStoreState(state => state.globalModel.userInfo);

  return authority && !authority.includes(role ?? Roles.Guest) ? (
    <Redirect to="/login" />
  ) : (
    <Route {...otherProps} />
  );
}
