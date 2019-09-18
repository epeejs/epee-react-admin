import { dashboardModel, DashboardModel } from './dashboard.model';
import { globalModel, GlobalModel } from './global.model';
import { tableListModel, TableListModel } from './table-list.model';

export interface StoreModel {
  globalModel: GlobalModel;
  tableListModel: TableListModel;
  dashboardModel: DashboardModel;
}

export const storeModel: StoreModel = {
  globalModel,
  tableListModel,
  dashboardModel,
};
