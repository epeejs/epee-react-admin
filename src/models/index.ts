import { globalModel, GlobalModel } from './global.model';
import { tableListModel, TableListModel } from './table-list.model';

export interface StoreModel {
  globalModel: GlobalModel;
  tableListModel: TableListModel;
}

export const storeModel: StoreModel = {
  globalModel,
  tableListModel,
};
