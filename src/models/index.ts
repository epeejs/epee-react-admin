import { dashboardModel, DashboardModel } from './dashboard.model';
import { globalModel, GlobalModel } from './global.model';
import { ReposModel, reposModel } from './repos.model';

export interface StoreModel {
  reposModel: ReposModel;
  globalModel: GlobalModel;
  dashboardModel: DashboardModel;
}

export const storeModel: StoreModel = {
  reposModel,
  globalModel,
  dashboardModel,
};
