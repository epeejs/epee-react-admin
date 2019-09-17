import { Button, Icon } from 'antd';
import { router } from 'constants/router';
import { useStoreActions, useStoreState } from 'hooks';
import BasicLayout from 'layouts/BasicLayout';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './Home.module.scss';

export default function Home(props: RouteComponentProps) {
  const collapseMenu = useStoreState(state => state.globalModel.collapseMenu);
  const setCollapseMenu = useStoreActions(
    actions => actions.globalModel.setCollapseMenu,
  );

  return (
    <BasicLayout menuData={router} collapsed={collapseMenu} {...props}>
      <div className={styles.header}>
        <Button type="primary" onClick={() => setCollapseMenu(!collapseMenu)}>
          <Icon type={collapseMenu ? 'menu-unfold' : 'menu-fold'} />
        </Button>
      </div>
    </BasicLayout>
  );
}
