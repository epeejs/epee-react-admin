import Analysis from 'components/analysis';
import TableList from 'components/TableList';
import { MenuDataItem } from 'layouts/BasicLayout';

export const router: MenuDataItem[] = [
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
    ],
  },
];
