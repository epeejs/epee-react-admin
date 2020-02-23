import { Avatar, Dropdown, Icon, Menu } from 'antd';
import React from 'react';
import { useStoreActions, useStoreState } from 'src/hooks';
import styles from './index.module.scss';

interface HomeHeaderProps {
  [key: string]: any;
}

export default function HomeHeader(props: HomeHeaderProps) {
  const { collapseMenu, userInfo } = useStoreState(state => state.globalModel);
  const setCollapseMenu = useStoreActions(
    actions => actions.globalModel.setCollapseMenu,
  );

  return (
    <div className={styles.wrap}>
      <Icon
        className={styles.btn_toggle}
        type={collapseMenu ? 'menu-unfold' : 'menu-fold'}
        onClick={() => setCollapseMenu(!collapseMenu)}
      />

      <Dropdown
        className={styles.pop}
        overlay={
          <Menu>
            <Menu.Item>
              <span
                className={styles.menu_item}
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/login';
                }}
              >
                <Icon type="poweroff" style={{ marginRight: 15 }} />
                <span>退出登录</span>
              </span>
            </Menu.Item>
          </Menu>
        }
      >
        <div className={styles.pop_trigger}>
          <Avatar icon="user" />
          <span className={styles.user_name}>{userInfo.name}</span>
        </div>
      </Dropdown>
    </div>
  );
}
