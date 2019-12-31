import { Action, action } from 'easy-peasy';
import { Roles } from 'src/layouts/RouterLayout';

export interface UserInfo {
  name: string;
  role: Roles;
}
export interface GlobalModel {
  collapseMenu: boolean;
  setCollapseMenu: Action<GlobalModel, boolean>;
  userInfo: UserInfo;
  setUserInfo: Action<GlobalModel, UserInfo>;
}

export const globalModel: GlobalModel = {
  collapseMenu: false,
  setCollapseMenu: action((state, payload) => {
    state.collapseMenu = payload;
  }),
  userInfo: {
    name: 'Scott Anderson',
    role: Roles.Guest,
  },
  setUserInfo: action((state, payload) => {
    state.userInfo = payload;
  }),
};
