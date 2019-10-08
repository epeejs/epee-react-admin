import React from 'react';
import EChart, { EChartOption } from 'src/components/rc-echart';

interface Value {
  name: string;
  value: number;
}

interface PieChartProps {
  ringData: Value[];
  timestamp: number;
}

export default function PieChart(props: PieChartProps) {
  const ringData = props.ringData;

  const option: EChartOption = {
    grid: {
      bottom: '5%',
      left: '1%',
      right: '1%',
      top: '5%',
      containLabel: true,
    },
    color: [
      '#FF6B6B',
      '#665FFF',
      '#3BCDE2',
      '#1DD1A1',
      '#FEBD34',
      '#FF9057',
      '#2378f7',
      '#83bff6',
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{b} <br/>数量：{c}个<br/>占比：{d}%',
    },

    legend: {
      type: 'scroll',
      orient: 'vertical',
      top: '10%',
      left: '15',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 14,
      icon: 'circle',
    },

    series: [
      {
        name: '访问来源',
        type: 'pie',
        center: ['60%', '50%'],
        radius: ['25%', '75%'],
        data: ringData.sort(function(a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
      },
      {
        type: 'pie',
        center: ['80%', '50%'],
        radius: ['10%'],
        avoidLabelOverlap: false,
        startAngle: 225,
        data: [100],
        itemStyle: {
          normal: {
            color: 'rgba(225,225,225,0.06)',
          },
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
