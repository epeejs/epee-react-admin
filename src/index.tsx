import { ConfigProvider, message } from 'antd';
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
import request from './utils/request';

moment.locale('zh-cn');
request.interceptors.response = async function(response) {
  const res: ResponseBody<any> = await response.json();

  if (!res.code) {
    return res;
  } else {
    // eslint-disable-next-line
    throw { statusText: res.data, url: response.url, res };
  }
};
request.interceptors.catch = function(error) {
  if (error.status === 401) {
    sessionStorage.setItem('code', '401');
    window.location.href = '/login';
    return;
  }

  message.error(error.statusText ?? '无法连接服务器');
};

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
