import { Api } from 'constants/Api';
import { Service, ServiceFilter } from 'models/table-list.model';
import request from 'utils/request';

export const getServiceList = (filter: ServiceFilter) =>
  request<ResponseBody<PageData<Service>>>(Api.POST_SERVICE_LIST, {
    method: 'post',
    body: JSON.stringify(filter),
  });
