import { Avatar, Dropdown, Menu } from 'antd';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { router } from 'src/constants/router';
import BasicLayout from 'src/layouts/BasicLayout';
import styles from './Home.module.scss';

export default function Home(props: RouteComponentProps) {
  return (
    <BasicLayout router={router} {...props}>
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
          <Avatar icon="user" />
          <span className={styles.user_name}>Scott Anderson</span>
        </div>
      </Dropdown>
    </BasicLayout>
  );
}
