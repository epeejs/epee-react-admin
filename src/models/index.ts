import { globalModel, GlobalModel } from './global.model';
import { ReposModel, reposModel } from './repos.model';

export interface StoreModel {
  reposModel: ReposModel;
  globalModel: GlobalModel;
}

export const storeModel: StoreModel = {
  reposModel,
  globalModel,
};
