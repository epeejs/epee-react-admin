import { globalModel, GlobalModel } from './global.model';

export interface StoreModel {
  globalModel: GlobalModel;
}

export const storeModel: StoreModel = {
  globalModel,
};
