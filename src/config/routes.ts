import { FileOutlined, FormOutlined, TableOutlined } from '@ant-design/icons';
import type { RouteConfig } from '@epeejs/pro-layout/es/type';
import PageLayout from 'src/layouts/PageLayout';
import BasicForm from 'src/pages/BasicForm';
import NoAuth from 'src/pages/exception/403';
import NotFound from 'src/pages/exception/404';
import Login from 'src/pages/Login';
import NewPage from 'src/pages/NewPage';
import TableList from 'src/pages/TableList';

// ! 始终保证准确路径在前
export const routes: RouteConfig[] = [
  { path: '/login', name: '登录', component: Login },
  {
    path: '/',
    component: PageLayout,
    routes: [
      // {
      //   path: '/dashboard',
      //   name: 'Dashboard',
      //   icon: DashboardOutlined,
      //   routes: [{ path: '/dashboard/analysis', name: '分析页', component: Analysis }],
      // },
      {
        path: '/form',
        name: '表单页',
        icon: FormOutlined,
        routes: [{ path: '/form/basic-form', name: '基础表单', component: BasicForm }],
      },
      {
        path: '/list',
        name: '列表页',
        icon: TableOutlined,
        routes: [
          {
            path: '/list/table-list',
            name: '查询表格',
            component: TableList,
          },
          {
            path: '/list/card-list',
            name: '卡片列表',
          },
          {
            path: '/list/search',
            name: '搜索列表',
            routes: [
              {
                path: '/list/search/articles',
                name: '搜索列表（文章）',
              },
            ],
          },
        ],
      },
      {
        path: '/new',
        name: '新页面',
        icon: FileOutlined,
        component: NewPage,
      },
      {
        path: '/403',
        component: NoAuth,
      },
      {
        path: '/',
        redirect: '/dashboard/analysis',
      },
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];
