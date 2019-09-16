import { Button, Icon } from 'antd';
import { router } from 'constants/router';
import BasicLayout from 'layouts/BasicLayout';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './Home.module.scss';

export default function Home(props: RouteComponentProps) {
  const [collapseMenu, setCollapseMenu] = useState(false);

  return (
    <BasicLayout menuData={router} collapsed={collapseMenu} {...props}>
      <div className={styles.header}>
        <Button
          type="primary"
          onClick={() => setCollapseMenu(!collapseMenu)}
          style={{ marginBottom: 16 }}
        >
          <Icon type={collapseMenu ? 'menu-unfold' : 'menu-fold'} />
        </Button>
      </div>
    </BasicLayout>
  );
}
