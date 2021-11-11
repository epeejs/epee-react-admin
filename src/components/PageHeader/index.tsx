import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Dropdown, Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/hooks';
import styles from './index.module.less';

type PageHeaderProps = Record<string, any>;

const { Header } = Layout;

const PageHeader: React.FC<PageHeaderProps> = () => {
  const userInfo = useAppSelector((state) => state.login.userInfo);

  return (
    <Header className={styles.wrap}>
      <div className={styles.left}>
        <Link className={styles.logo} to="/" />
        <Divider type="vertical" style={{ height: 20 }} />
        <span>Epee Admin</span>
      </div>

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
    </Header>
  );
};

export default PageHeader;
