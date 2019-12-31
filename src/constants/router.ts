import BasicLayout from 'src/layouts/BasicLayout';
import { Roles, RouteNode } from 'src/layouts/RouterLayout';
import Analysis from 'src/pages/analysis';
import HomeHeader from 'src/pages/home-header';
import Login from 'src/pages/Login';
import NewPage from 'src/pages/NewPage';
import TableList from 'src/pages/table-list';

// ! 始终保证准确路径在前
export const router: RouteNode[] = [
  { path: '/login', name: '登录', component: Login },
  {
    path: '/',
    name: '首页',
    component: BasicLayout,
    child: HomeHeader,
    layout: true,
    authority: [Roles.Guest],
    routes: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'dashboard',
        routes: [
          { path: '/dashboard/analysis', name: '分析页', component: Analysis },
        ],
      },
      {
        path: '/form',
        name: '表单页',
        icon: 'form',
        routes: [{ path: '/form/basic-form', name: '基础表单' }],
      },
      {
        path: '/list',
        name: '列表页',
        icon: 'table',
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
        icon: 'file',
        component: NewPage,
      },
      {
        path: '/',
        redirect: '/dashboard/analysis',
        hideInMenu: true,
      },
    ],
  },
];
