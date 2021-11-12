# epee react admin

中后台应用模版，使用 CRA 作为基础模版搭建，简单、易扩展，且不限制技术栈

## 💡 预览

水平布局 (master)：<https://epee.netlify.app/> ![hlayout](https://raw.githubusercontent.com/dobble11/aseets/master/hlayout.png)

垂直布局 ([dev-vertical-layout](https://github.com/dobble11/epee-react-admin-ts/tree/dev-vertical-layout))：<https://vepee.netlify.app/> ![vlayout](https://raw.githubusercontent.com/dobble11/aseets/master/vlayout.png)

## 🚀 特性

包含 CRA 所有功能，同时包含以下功能

- 基于布局模式开发
- 根据路由配置生成菜单
- antd 的按需加载
- 通用权限控制及路由 Hook
- 支持 less css module
- 提供常用布局组件
- 严格的 lint 规则及提交检查

## 技术栈

react、antd、@reduxjs/toolkit、[@epeejs/pro-layout](https://github.com/epeejs/react-components/tree/main/packages/pro-layout)

## 🏃 开始

```sh
yarn
yarn start
```

> 为了更好的开发体验，你还需要安装以下 VSCode 插件
>
> - **Prettier - Code formatter**
> - **ESLint**
>
> 推荐安装
>
> - **Auto Close Tag**
> - **Auto Rename Tag**
> - **CSS Modules**
> - **Paste JSON as Code**
> - **ES7 React/Redux/GraphQL/React-Native snippets**

## 🌳 目录结构

```sh
├── public
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── config               # 配置目录，包含主题、路由配置
│   ├── hooks                # 通用 hook
│   ├── layouts              # 通用布局，分为页面布局、路由布局
│   ├── store                # 状态库
│   │   └── slice            # redux slice 目录
│   ├── pages                # 业务页面入口
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── index.less           # 全局样式
│   └── index.tsx            # 全局入口
├── README.md
└── package.json
```

**页面代码结构推荐**

参考 [antd pro](https://pro.ant.design/zh-CN/docs/folder/#%E9%A1%B5%E9%9D%A2%E4%BB%A3%E7%A0%81%E7%BB%93%E6%9E%84%E6%8E%A8%E8%8D%90) 规范，简单讲就是组件文件夹大写驼峰命名，分组文件夹小写中线（-）连接，路由组件应该是被打平的

## ⚒ 开发

### 新增页面

这里的『页面』指配置了路由，能够通过链接直接访问的模块

#### 1. 新增 tsx、less 文件

```diff
src
  models
  pages
+   NewPage.tsx
+   NewPage.module.less
```

**NewPage.tsx** 部分代码如下：

```tsx
export default function NewPage(props: NewPageProps) {
  return <div className={styles.wrap}>New Page</div>;
}
```

可以键入 `tsrfc` 快速生成模板代码，后面直接列出代码片段快捷键，不再说明

#### 2. 将页面加入路由

修改 **config/routes.ts** 内容

```diff
export const routes: RouteConfig[] = [
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
      ...
+     {
+       path: '/new',
+       name: '新页面',
+       icon: FileOutlined,
+       component: NewPage,
+     },
    ]
  }
]
```

修改好之后运行，可以看到如下效果

![preview](https://raw.githubusercontent.com/dobble11/aseets/master/newpage.png)

## 布局与路由

参考 [@epeejs/pro-layout](https://github.com/epeejs/react-components/tree/main/packages/pro-layout)使用文档

## 权限管理（待补充）
