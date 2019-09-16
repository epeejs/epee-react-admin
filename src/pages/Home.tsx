import { router } from 'constants/router';
import BasicLayout from 'layouts/BasicLayout';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './Home.module.scss';

export default function Home(props: RouteComponentProps) {
  return (
    <BasicLayout menuData={router} {...props}>
      <div className={styles.header}>Header</div>
    </BasicLayout>
  );
}
