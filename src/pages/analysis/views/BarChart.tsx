import * as echarts from 'echarts/lib/echarts';
import _ from 'lodash';
import React from 'react';
import EChart, { EChartOption } from 'src/components/rc-echart';

interface Value {
  name: string;
  value: number;
}

interface BarChartProps {
  practiceData?: Value[];
  timestamp?: number;
}

export default function BarChart(props: BarChartProps) {
  const names = _.map(props.practiceData, 'name');
  const values = _.map(props.practiceData, 'value');
  const total = _.sum(values);

  const option: EChartOption = {
    grid: {
      bottom: '5%',
      left: '5%',
      right: '5%',
      top: '5%',
      containLabel: true,
    },
    color: ['#0EBD73'],
    xAxis: [
      {
        type: 'category',
        data: names,
        //   坐标轴轴线相关设置
        axisLine: {
          show: true,
          lineStyle: {
            color: '#DFE1E6',
          },
        },

        //   坐标轴刻度相关设置
        axisTick: {
          show: false,
        },

        //   坐标刻度相关设置
        axisLabel: {
          show: true,
          color: '#616773',
          rotate: 30,
          interval: 0,
        },

        //   坐标再grid区域的分割线
        splitLine: {
          show: false,
        },
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
          formatter: '{value}人',
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
    tooltip: {
      formatter: function(params: any, ticket, callback) {
        const proportion =
          Number((params.value / total) * 100).toFixed(2) + '%';
        return (
          `${params.name}` +
          '</br>' +
          '人数：' +
          `${params.value}人</br>` +
          `占比：${proportion}`
        );
      },
      position: 'top',
    },
    series: [
      {
        type: 'bar',
        barWidth: 24,
        data: values,
        itemStyle: {
          barBorderRadius: [8, 8, 0, 0],
          emphasis: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' },
            ]),
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
