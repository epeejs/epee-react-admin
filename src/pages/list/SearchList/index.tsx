import { PageContainer } from '@epeejs/pro-layout';
import type { LRouteComponentProps } from '@epeejs/pro-layout/es/type';
import { Card } from 'antd';
import React from 'react';

const SearchList: React.FC<Required<LRouteComponentProps>> = ({
  location,
  history,
  children,
  routes,
}) => {
  const tablist = routes.map((m) => ({
    key: m.path,
    tab: m.meta!.shortName,
  }));

  const handleTabChange = (key: string) => {
    history.push(key);
  };
  const getTabKey = () => {
    return routes.find((m) => location.pathname.includes(m.path))?.path;
  };

  return (
    <PageContainer tabList={tablist} tabActiveKey={getTabKey()} onTabChange={handleTabChange}>
      <Card>{children}</Card>
    </PageContainer>
  );
};

export default SearchList;
