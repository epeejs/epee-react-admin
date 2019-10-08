import { Icon } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { router } from 'src/constants/router';
import { useStoreActions, useStoreState } from 'src/hooks';
import BasicLayout from 'src/layouts/BasicLayout';
import styles from './Home.module.scss';

export default function Home(props: RouteComponentProps) {
  const collapseMenu = useStoreState(state => state.globalModel.collapseMenu);
  const setCollapseMenu = useStoreActions(
    actions => actions.globalModel.setCollapseMenu,
  );

  return (
    <BasicLayout menuData={router} collapsed={collapseMenu} {...props}>
      <div className={styles.header}>
        <Icon
          className={styles.btn_toggle}
          type={collapseMenu ? 'menu-unfold' : 'menu-fold'}
          onClick={() => setCollapseMenu(!collapseMenu)}
        />
      </div>
    </BasicLayout>
  );
}
