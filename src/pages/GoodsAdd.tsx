import { PageHeader } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import styles from './GoodsAdd.module.scss';

interface GoodsAddProps extends RouteComponentProps {
  [key: string]: any;
}

export default function GoodsAdd(props: GoodsAddProps) {
  return (
    <PageHeader
      className={styles.wrap}
      onBack={() => props.history.goBack()}
      title="新建商品"
    >
      Content
    </PageHeader>
  );
}
