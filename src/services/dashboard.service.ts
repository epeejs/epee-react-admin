import { Api } from 'constants/Api';
import request from 'utils/request';

export const getChartData = () => request<any>(Api.GET_CHART_DATA);
