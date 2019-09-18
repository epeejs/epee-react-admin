import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import * as echarts from 'echarts/lib/echarts';
import React, { useEffect, useRef } from 'react';
import { useMount, useUnmount } from 'react-use';

export type EChartOption = echarts.EChartOption;
interface EChartProps {
  option: EChartOption;
  timestamp?: number;
  style?: React.CSSProperties;
  onClick?: (param: any) => void;
}

export default function EChart({
  option,
  onClick,
  timestamp,
  style = { width: '100%', height: '100%' },
}: EChartProps) {
  const cntrRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  function resize() {
    if (chartRef.current) {
      chartRef.current.resize();
    }
  }

  useMount(() => {
    setTimeout(() => {
      const chart = echarts.init(cntrRef.current!);
      chart.on('click', (params: any) => onClick && onClick(params));
      chart.setOption(option);
      chartRef.current = chart;
    }, 100);
  });

  useUnmount(() => {
    if (chartRef.current) {
      chartRef.current.dispose();
    }
  });

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.setOption(option);
    }
  }, [option]);

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    resize();
  }, [timestamp]);

  return <div style={style} ref={cntrRef} />;
}
