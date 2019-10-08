import { Api } from 'src/constants/Api';
import request from 'src/utils/request';

export interface Service {
  avatar: string;
  callNo: number;
  createdAt: string;
  desc: string;
  disabled: boolean;
  href: string;
  key: number;
  name: string;
  owner: string;
  progress: number;
  status: number;
  title: string;
  updatedAt: string;
}
export interface ServiceFilter {
  name: string;
  updateDate: string;
  page: number;
  pageSize: number;
}

export const getServiceList = (
  filter: Omit<ServiceFilter, keyof PageParams>,
  router: PageParams,
) =>
  request<ResponseBody<PageData<Service>>>(Api.POST_SERVICE_LIST, {
    method: 'post',
    router,
    body: JSON.stringify(filter),
  });
