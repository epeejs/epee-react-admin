import { Tabs } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { RouteType } from './BasicLayout';
import styles from './SettingLayout.module.scss';

const { TabPane } = Tabs;

interface SettingLayoutProps extends RouteComponentProps<{ item: string }> {
  routes: RouteType[];
}

export default function SettingLayout(props: SettingLayoutProps) {
  return (
    <div className={styles.wrap}>
      <Tabs
        tabPosition="left"
        activeKey={props.location.pathname}
        onChange={key => props.history.push(key)}
      >
        {props.routes.map(({ path, name, component: Component }) => (
          <TabPane key={path} tab={name}>
            {Component && <Component />}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
