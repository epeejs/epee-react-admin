import { BasicLayout, PageLoading } from '@epeejs/pro-layout';
import type { LRouteComponentProps } from '@epeejs/pro-layout/es/type';
import { Layout } from 'antd';
import _ from 'lodash';
import React, { useEffect } from 'react';
import createAuthorized, { checkAuth } from 'src/components/Authorized';
import PageHeader from 'src/components/PageHeader';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { fetchUserInfo } from 'src/store/slice/login';

const { Sider, Footer } = Layout;

const PageLayout: React.FC<LRouteComponentProps> = ({ routes }) => {
  const { currAuth, loading, userInfo } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || _.isEmpty(userInfo)) {
    return <PageLoading />;
  }

  return (
    <BasicLayout
      routes={routes!}
      authInfo={currAuth}
      header={<PageHeader />}
      footer={<Footer />}
      siderRender={(menu) => (
        <Sider width={240} theme="light">
          {menu}
        </Sider>
      )}
      checkAuth={checkAuth}
      createAuthorized={createAuthorized}
    />
  );
};

export default PageLayout;
