import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './style/TableList.module.scss';

interface TableListProps extends RouteComponentProps {
  [key: string]: any;
}

export default function TableList(props: TableListProps) {
  return <div className={styles.wrap}>查询表格</div>;
}
