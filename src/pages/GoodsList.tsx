import { Button } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './GoodsList.module.scss';

interface GoodsListProps extends RouteComponentProps {
  [key: string]: any;
}

const GoodsList: React.FC<GoodsListProps> = props => {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h5>标题</h5>
        <Link to="/goods/add">
          <Button type="primary">新建商品</Button>
        </Link>
      </div>

      <div className={styles.body}>Content</div>
    </div>
  );
};

export default GoodsList;
