import { RouteLayout } from '@epeejs/pro-layout';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { routes } from './config/routes';
import './index.less';
import store from './store';
import request from './utils/request';

request.default.baseURL = 'https://www.fastmock.site/mock/e24cdafccdc310a5f728225e4e0fa69f/epee';
request.interceptors.response = async (response) => {
  const res: ResponseData = await response.json();

  if (!res.code) {
    return res.data;
  }
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw { statusText: res.data, url: response.url, res };
};
request.interceptors.catch = (error) => {
  if (error.status === 401) {
    window.location.href = '/login';
    return;
  }

  message.error(error.statusText ?? '无法连接服务器');
};

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Router>
        <RouteLayout routes={routes} />
      </Router>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
);
