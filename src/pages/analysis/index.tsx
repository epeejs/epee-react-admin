import { Card, Col, Empty, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAsyncFn, useMount } from 'react-use';
import { useStoreActions, useStoreState } from 'src/hooks';
import styles from './index.module.scss';
import BarChart from './views/BarChart';
import LineChart from './views/LineChart';
import PieChart from './views/PieChart';

interface AnalysisProps {
  [key: string]: any;
}

export default function Analysis(props: AnalysisProps) {
  const collapseMenu = useStoreState(state => state.globalModel.collapseMenu);
  const [timestamp, setTimestamp] = useState(0);
  const chartData = useStoreState(state => state.dashboardModel.chartData);
  const { bar, pie, line } = chartData;
  const fetchChartData = useStoreActions(
    actions => actions.dashboardModel.fetchChartData,
  );
  const [state, fetch] = useAsyncFn(() => fetchChartData());
  useMount(() => {
    fetch();
  });

  // 监听侧边栏变化，传入时间戳到echart中
  useEffect(() => {
    setTimeout(() => {
      setTimestamp(Date.now());
    }, 200);
  }, [collapseMenu]);

  return (
    <div className={styles.wrap}>
      <Row gutter={16}>
        <Col className="gutter-row" span={8}>
          <Card title="半年度人流量分析" bordered={false}>
            <Spin spinning={state.loading}>
              {bar.length > 0 ? (
                <BarChart timestamp={timestamp} practiceData={bar} />
              ) : (
                <Empty style={{ height: '300px' }} />
              )}
            </Spin>
          </Card>
        </Col>
        <Col className="gutter-row" span={8}>
          <Card title="销售额类别占比" bordered={false}>
            <Spin spinning={state.loading}>
              {pie.length > 0 ? (
                <PieChart timestamp={timestamp} ringData={pie} />
              ) : (
                <Empty style={{ height: '300px' }} />
              )}
            </Spin>
          </Card>
        </Col>
        <Col className="gutter-row" span={8}>
          <Card title="年度销售额分析" bordered={false}>
            <Spin spinning={state.loading}>
              {line.length > 0 ? (
                <LineChart timestamp={timestamp} lineData={line} />
              ) : (
                <Empty style={{ height: '300px' }} />
              )}
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
