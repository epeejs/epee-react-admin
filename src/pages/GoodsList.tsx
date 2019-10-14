import { Button } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import styles from './GoodsList.module.scss';

interface GoodsListProps extends RouteComponentProps {
  [key: string]: any;
}

export default function GoodsList(props: GoodsListProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h5>标题</h5>
        <Button type="primary" onClick={() => props.history.push('/goods/add')}>
          新建商品
        </Button>
      </div>

      <div className={styles.body}>Content</div>
    </div>
  );
}
