import { Api } from 'src/constants/Api';
import request from 'src/utils/request';

export const getChartData = () => request<any>(Api.GET_CHART_DATA);
