import { Action, action } from 'easy-peasy';

export interface GlobalModel {
  collapseMenu: boolean;
  setCollapseMenu: Action<GlobalModel, boolean>;
}

export const globalModel: GlobalModel = {
  collapseMenu: false,
  setCollapseMenu: action((state, payload) => {
    state.collapseMenu = payload;
  }),
};
