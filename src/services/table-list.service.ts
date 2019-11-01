import { Api } from 'src/constants/Api';
import { Service, ServiceFilter } from 'src/models/table-list.model';
import request from 'src/utils/request';

export const getServiceList = (
  filter: Omit<ServiceFilter, keyof PageParams>,
  router: PageParams,
) =>
  request<ResponseBody<PageData<Service>>>(Api.POST_SERVICE_LIST, {
    method: 'post',
    router,
    body: JSON.stringify(filter),
  });
