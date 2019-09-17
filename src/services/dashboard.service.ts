import { Api } from 'constants/Api';
import { ChartData } from 'models/dashboard.model';
import request from 'utils/request';

export const getChartData = () => request<ChartData>(Api.GET_CHART_DATA);
