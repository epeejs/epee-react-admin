import { Card, Col, Empty, Row, Spin } from 'antd';
import BarChart from 'components/charts/BarChart';
import { useStoreActions, useStoreState } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useAsyncFn, useMount } from 'react-use';
import styles from './style/Analysis.module.scss';

interface AnalysisProps {
  [key: string]: any;
}

export default function Analysis(props: AnalysisProps) {
  const collapseMenu = useStoreState(state => state.globalModel.collapseMenu);
  const [timestamp, setTimestamp] = useState(0);
  const chartData = useStoreState(state => state.dashboardModel.chartData);
  const { bar } = chartData;
  const fetchChartData = useStoreActions(
    actions => actions.dashboardModel.fetchChartData,
  );
  const [state, fetch] = useAsyncFn(() => fetchChartData());
  useMount(() => {
    fetch();
  });

  useEffect(() => {
    setTimeout(() => {
      setTimestamp(Date.now());
    }, 200);
  }, [collapseMenu]);

  return (
    <div className={styles.wrap}>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Card title="执业类型分析" bordered={false}>
            <Spin spinning={state.loading}>
              {bar.length > 0 ? (
                <BarChart timestamp={timestamp} practiceData={bar} />
              ) : (
                <Empty />
              )}
            </Spin>
          </Card>
        </Col>
        <Col className="gutter-row" span={12}>
          <Card title="执业类型分析" bordered={false}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
