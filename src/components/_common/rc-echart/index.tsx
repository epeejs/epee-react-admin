import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import * as echarts from 'echarts/lib/echarts';
import React, { useEffect, useRef } from 'react';
import { useEffectOnce } from 'react-use';

export type EChartOption = echarts.EChartOption;
interface EChartProps {
  option: EChartOption;
  style?: React.CSSProperties;
  onClick?: (param: any) => void;
}

export default function EChart({
  option,
  onClick,
  style = { width: '100%', height: '100%' },
}: EChartProps) {
  const cntrRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffectOnce(() => {
    const chart = echarts.init(cntrRef.current!);
    chart.on('click', (params: any) => onClick && onClick(params));
    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  });
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.setOption(option);
    }
  }, [option]);
  useEffect(() => {
    function resize() {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    }
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <div style={style} ref={cntrRef} />;
}
