import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import zhCN from 'antd/lib/locale/zh_CN';
import { StoreProvider } from 'easy-peasy';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { router } from './constants/router';
import { store } from './constants/store';
import RouterLayout from './layouts/RouterLayout';
import './style/global.css';

moment.locale('zh-cn');

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <StoreProvider store={store}>
      <Router>
        <RouterLayout router={router} />
      </Router>
    </StoreProvider>
  </ConfigProvider>,
  document.getElementById('root'),
);
