import { FormOutlined, TableOutlined } from '@ant-design/icons';
import type { RouteConfig } from '@epeejs/pro-layout/es/type';
import PageLayout from 'src/layouts/PageLayout';
import BasicForm from 'src/pages/BasicForm';
import NoAuth from 'src/pages/exception/403';
import NotFound from 'src/pages/exception/404';
import SearchList from 'src/pages/list/SearchList';
import Application from 'src/pages/list/SearchList/components/Application';
import Project from 'src/pages/list/SearchList/components/Project';
import TableList from 'src/pages/list/TableList';
import Login from 'src/pages/Login';

// ! 始终保证准确路径在前
export const routes: RouteConfig[] = [
  { path: '/login', name: '登录', component: Login },
  {
    path: '/',
    component: PageLayout,
    routes: [
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
            path: '/list/search',
            name: '搜索列表',
            component: SearchList,
            routes: [
              {
                path: '/list/search/project',
                name: '搜索列表（项目）',
                component: Project,
                meta: {
                  shortName: '项目',
                },
              },
              {
                path: '/list/search/application',
                name: '搜索列表（应用）',
                component: Application,
                meta: {
                  shortName: '应用',
                },
              },
            ],
          },
          {
            path: '/list/table-list',
            name: '查询表格',
            component: TableList,
          },
          {
            path: '/list/card-list',
            name: '卡片列表',
          },
        ],
      },
      {
        path: '/403',
        component: NoAuth,
      },
      {
        path: '/',
        redirect: '/form/basic-form',
      },
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];
