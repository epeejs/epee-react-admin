import type { Meta } from '@epeejs/pro-layout/es/type';
import _ from 'lodash';
import React from 'react';
import { Redirect } from 'react-router-dom';
import type { AuthType } from 'src/store/slice/login';

export default function createAuthorized(auth: AuthType) {
  return function withAuthorized(component: React.ElementType, meta: Meta = {}): React.ElementType {
    if (!meta.funcCode) {
      return component;
    }
    const codes = auth[meta.funcCode]?.map((m) => m.code) ?? [];
    const Authorized: React.ForwardRefRenderFunction<any, any> = (props, ref) => {
      if (_.isEmpty(codes) || (meta.code && !codes.includes(meta.code))) {
        return <Redirect to="/403" />;
      }

      return React.createElement(component, { ...props, ref });
    };

    return React.forwardRef(Authorized);
  };
}

export const checkAuth = (auth: AuthType, meta: Meta = {}) => {
  if (!meta.funcCode) {
    return true;
  }
  const codes = auth[meta.funcCode]?.map((m) => m.code) ?? [];
  if (_.isEmpty(codes) || (meta.code && !codes.includes(meta.code))) {
    return false;
  }
  return true;
};
