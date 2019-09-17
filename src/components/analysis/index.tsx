import React from 'react';
import styles from './style/Analysis.module.scss';

interface AnalysisProps {
  [key: string]: any;
}

export default function Analysis(props: AnalysisProps) {
  return <div className={styles.wrap}>数据分析页面</div>;
}
