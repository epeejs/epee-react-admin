import _ from 'lodash';
import React from 'react';
import EChart, { EChartOption } from 'src/components/rc-echart';

interface Value {
  name: string;
  value: number;
}

interface LineChartProps {
  lineData: Value[];
  timestamp: number;
}

export default function LineChart(props: LineChartProps) {
  const datax = _.map(props.lineData, 'name');
  const datay = _.map(props.lineData, 'value');

  const option: EChartOption = {
    grid: {
      bottom: '5%',
      left: '2%',
      right: '3%',
      top: '8%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}:{c}万元',
    },

    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#DFE1E6',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: '#616773',
          rotate: 30,
          interval: 0,
        },
        splitLine: {
          show: false,
        },
        data: datax,
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: '#616773',
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#DFE1E6',
            type: 'dashed',
          },
        },
      },
    ],
    series: [
      {
        name: '移动',
        type: 'line',
        smooth: true,
        symbol: 'emptyCircle',
        symbolSize: 8,
        showSymbol: false,
        data: datay,
        itemStyle: {
          width: 4,
          color: '#286BFF',
        },
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <EChart option={option} timestamp={props.timestamp} />
    </div>
  );
}
