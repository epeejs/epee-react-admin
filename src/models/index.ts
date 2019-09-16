import { ReposModel, reposModel } from './repos.model';

export interface StoreModel {
  reposModel: ReposModel;
}

export const storeModel: StoreModel = {
  reposModel,
};
