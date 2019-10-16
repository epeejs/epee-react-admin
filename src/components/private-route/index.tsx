import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  validate: () => boolean;
}

export default function PrivateRoute({
  validate,
  ...otherProps
}: PrivateRouteProps) {
  return validate() ? <Route {...otherProps} /> : <Redirect to="/login" />;
}
