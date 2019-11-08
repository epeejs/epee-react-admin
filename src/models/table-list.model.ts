import { Action, action, ActionTypes, Thunk, thunk } from 'easy-peasy';
import { getServiceList } from 'src/services/table-list.service';
import { O } from 'ts-toolbelt';

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
export interface TableListModel {
  data: PageData<Service>;
  filter: ServiceFilter;
  modifyFilter: Action<TableListModel, Partial<ServiceFilter>>;
  resetFilter: Action<TableListModel>;
  setData: Action<TableListModel, PageData<Service>>;
  fetchServiceList: Thunk<TableListModel>;
}

const initState: O.Filter<TableListModel, ActionTypes> = {
  data: {
    list: [],
    total: 0,
  },
  filter: {
    name: '',
    updateDate: '',
    page: 1,
    pageSize: 10,
  },
};

export const tableListModel: TableListModel = {
  ...initState,
  modifyFilter: action((state, payload) => {
    state.filter = { ...state.filter, ...payload };
  }),
  resetFilter: action(state => {
    state.filter = initState.filter;
  }),
  setData: action((state, payload) => {
    state.data = payload;
  }),
  fetchServiceList: thunk(async (actions, payload, { getState }) => {
    const { page, pageSize, ...otherFilter } = getState().filter;
    const res = await getServiceList(otherFilter, { page, pageSize });

    actions.setData(res.data);
  }),
};
