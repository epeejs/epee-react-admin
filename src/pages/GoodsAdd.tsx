import { PageHeader } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import styles from './GoodsAdd.module.scss';

interface GoodsAddProps extends RouteComponentProps {
  [key: string]: any;
}

const GoodsAdd: React.FC<GoodsAddProps> = props => {
  return (
    <PageHeader
      className={styles.wrap}
      onBack={() => props.history.goBack()}
      title="新建商品"
    >
      Content
    </PageHeader>
  );
};

export default GoodsAdd;
