import BasicLayout from 'src/layouts/BasicLayout';
import { RouteNode } from 'src/layouts/RouterLayout';
import SettingLayout from 'src/layouts/SettingLayout';
import GoodsAdd from 'src/pages/GoodsAdd';
import GoodsList from 'src/pages/GoodsList';
import HomeHeader from 'src/pages/home-header';

// 始终保证准确路径在前
export const router: RouteNode[] = [
  {
    path: '/',
    name: '首页',
    component: BasicLayout,
    child: HomeHeader,
    layout: true,
    routes: [
      {
        path: '/goods',
        name: '商品管理',
        redirect: '/goods/list',
        routes: [
          {
            path: '/goods/list',
            name: '商品列表',
            component: GoodsList,
          },
          {
            path: '/goods/add',
            name: '新建商品',
            component: GoodsAdd,
          },
          {
            path: '/goods/edit/:id',
            name: '编辑商品',
          },
        ],
      },
      {
        path: '/store',
        name: '店铺管理',
        redirect: '/store/list',
        routes: [
          { path: '/store/list', name: '店铺列表' },
          {
            path: '/store/add',
            name: '新建店铺',
          },
        ],
      },
      {
        path: '/user',
        name: '用户管理',
        redirect: '/user/list',
        routes: [
          {
            path: '/user/list',
            name: '用户列表',
          },
          {
            path: '/user/add',
            name: '新增用户',
          },
        ],
      },
      {
        path: '/setting/:item',
        name: '系统设置',
        hideInMenu: true,
        layout: true,
        component: SettingLayout,
        routes: [
          {
            path: '/setting/account',
            name: '帐号管理',
          },
          {
            path: '/setting/device',
            name: '设备管理',
          },
          {
            path: '/setting/org',
            name: '组织管理',
          },
          {
            path: '/setting/label',
            name: '标签管理',
          },
          {
            path: '/setting/template',
            name: '模版管理',
          },
        ],
      },
      {
        path: '/',
        redirect: '/goods/list',
        hideInMenu: true,
      },
    ],
  },
];
