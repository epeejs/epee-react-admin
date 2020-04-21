import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export default function HomeHeader() {
  return (
    <>
      <Dropdown
        className={styles.pop}
        overlay={
          <Menu>
            <Menu.Item>
              <Link to="/setting/account">系统设置</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/">个人中心</Link>
            </Menu.Item>
          </Menu>
        }
      >
        <div>
          <Avatar icon={<UserOutlined />} />
          <span className={styles.user_name}>Scott Anderson</span>
        </div>
      </Dropdown>
    </>
  );
}
