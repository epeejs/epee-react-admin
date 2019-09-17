import { Badge, Divider, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { useStoreActions, useStoreState } from 'hooks';
import moment from 'moment';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
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
            <button>配置</button>
            <Divider type="vertical" />
            <button>订阅警报</button>
          </div>
        );
      },
    },
  ];
  const { total, list } = useStoreState(state => state.tableListModel.data);
  const { page, pageSize } = useStoreState(
    state => state.tableListModel.filter,
  );
  const setFilter = useStoreActions(
    actions => actions.tableListModel.setFilter,
  );

  return (
    <div className={styles.wrap}>
      <Table
        columns={columns}
        dataSource={list}
        pagination={{
          total,
          pageSize,
          current: page,
          showSizeChanger: true,
          onChange(curr) {
            setFilter({ page: curr });
          },
          onShowSizeChange(curr, size) {
            setFilter({ page: 1, pageSize: size });
          },
        }}
      />
    </div>
  );
}
