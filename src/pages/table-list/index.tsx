import { Badge, Button, Divider, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { useStoreActions, useStoreState } from 'src/hooks';
import styles from './index.module.scss';

const status = ['关闭', '运行中', '已上线', '异常'];
const statusMap = ['default', 'processing', 'success', 'error'];

interface TableListProps extends RouteComponentProps {
  [key: string]: any;
}

export default function TableList(props: TableListProps) {
  const columns: ColumnProps<any>[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      align: 'right',
      render: (val: string) => `${val} 万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: '0',
        },
        {
          text: status[1],
          value: '1',
        },
        {
          text: status[2],
          value: '2',
        },
        {
          text: status[3],
          value: '3',
        },
      ],
      render(val: number) {
        return <Badge status={statusMap[val] as any} text={status[val]} />;
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      sorter: true,
      render(val: string) {
        return <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>;
      },
    },
    {
      title: '操作',
      render(_: any, row: any) {
        return (
          <div>
            <Button type="link">配置</Button>
            <Divider type="vertical" />
            <Button type="link">订阅警报</Button>
          </div>
        );
      },
    },
  ];
  const {
    data: { total, list },
    filter,
  } = useStoreState(state => state.tableListModel);
  const { modifyFilter, resetFilter, fetchServiceList } = useStoreActions(
    actions => actions.tableListModel,
  );
  const [state, fetch] = useAsyncFn(() => fetchServiceList());

  useEffect(() => {
    fetch();
  }, [fetch, filter]);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <Button type="primary">查询</Button>
        <Button onClick={() => resetFilter()}>重置</Button>
      </div>
      <Table
        columns={columns}
        dataSource={list}
        loading={state.loading}
        pagination={{
          total,
          pageSize: filter.pageSize,
          current: filter.page,
          showSizeChanger: true,
          onChange(curr) {
            modifyFilter({ page: curr });
          },
          onShowSizeChange(curr, size) {
            modifyFilter({ page: 1, pageSize: size });
          },
        }}
      />
    </div>
  );
}
