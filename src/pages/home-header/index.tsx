import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import React from 'react';
import { useStoreActions, useStoreState } from 'src/hooks';
import styles from './index.module.scss';

interface HomeHeaderProps {
  [key: string]: any;
}

const HomeHeader: React.FC<HomeHeaderProps> = props => {
  const { collapseMenu, userInfo } = useStoreState(state => state.globalModel);
  const setCollapseMenu = useStoreActions(
    actions => actions.globalModel.setCollapseMenu,
  );

  return (
    <div className={styles.wrap}>
      <span
        className={styles.btn_toggle}
        onClick={() => setCollapseMenu(!collapseMenu)}
      >
        {collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>

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
                <PoweroffOutlined style={{ marginRight: 15 }} />
                <span>退出登录</span>
              </span>
            </Menu.Item>
          </Menu>
        }
      >
        <div className={styles.pop_trigger}>
          <Avatar icon={<UserOutlined />} />
          <span className={styles.user_name}>{userInfo.name}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default HomeHeader;
