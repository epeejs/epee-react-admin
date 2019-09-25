import { Action, action, Thunk, thunk } from 'easy-peasy';
import {
  getServiceList,
  Service,
  ServiceFilter,
} from 'services/table-list.service';

export interface TableListModel {
  data: PageData<Service>;
  filter: ServiceFilter;
  setFilter: Action<TableListModel, Partial<ServiceFilter>>;
  resetFilter: Action<TableListModel>;
  setData: Action<TableListModel, PageData<Service>>;
  fetchServiceList: Thunk<TableListModel>;
}

const initFilter: ServiceFilter = {
  name: '',
  updateDate: '',
  page: 1,
  pageSize: 10,
};

export const tableListModel: TableListModel = {
  data: {
    list: [],
    total: 0,
  },
  filter: initFilter,
  setFilter: action((state, payload) => {
    state.filter = { ...state.filter, ...payload };
  }),
  resetFilter: action(state => {
    state.filter = initFilter;
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
