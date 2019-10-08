import { Action, action, Thunk, thunk } from 'easy-peasy';
import { getChartData } from 'src/services/dashboard.service';

interface Value {
  name: string;
  value: number;
}

export interface ChartData {
  bar: Value[];
  line: Value[];
  pie: Value[];
}

export interface DashboardModel {
  chartData: ChartData;
  setChartData: Action<DashboardModel, ChartData>;
  fetchChartData: Thunk<DashboardModel>;
}

export const dashboardModel: DashboardModel = {
  chartData: {
    bar: [],
    line: [],
    pie: [],
  },
  setChartData: action((state, payload) => {
    state.chartData = payload;
  }),

  fetchChartData: thunk(async actions => {
    const res = await getChartData();
    actions.setChartData(res.data);
  }),
};
