import { Card, Col, Row } from 'antd';
import BarChart from 'components/charts/BarChart';
import { useStoreState } from 'hooks';
import React, { useEffect, useState } from 'react';
import styles from './style/Analysis.module.scss';

interface AnalysisProps {
  [key: string]: any;
}

export default function Analysis(props: AnalysisProps) {
  const collapseMenu = useStoreState(state => state.globalModel.collapseMenu);
  const [timestamp, setTimestamp] = useState(0);

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
            <BarChart timestamp={timestamp} />
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
