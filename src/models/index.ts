import { AppModel, appModel } from './app.model';

export interface StoreModel {
  appModel: AppModel;
}

export const storeModel: StoreModel = {
  appModel,
};
