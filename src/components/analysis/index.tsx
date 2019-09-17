import { Card, Col, Row } from 'antd';
import BarChart from 'components/charts/BarChart';
import React from 'react';
import styles from './style/Analysis.module.scss';

interface AnalysisProps {
  [key: string]: any;
}

export default function Analysis(props: AnalysisProps) {
  return (
    <div className={styles.wrap}>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Card title="执业类型分析" bordered={false}>
            <BarChart />
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
