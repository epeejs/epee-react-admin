## 开始

```sh
yarn
yarn start
```

> 该项目使用 yarn 作为依赖管理工具，需要先安装 `npm i -g yarn`

> 为了更好的开发体验，你还需要安装以下 VSCode 插件
>
> - **Prettier - Code formatter**
> - **ESLint**
>
> 推荐安装
>
> - **Auto Close Tag**
> - **Auto Import**
> - **Auto Rename Tag**
> - **CSS Modules**
> - **Paste JSON as Code**
> - **Path Intellisense**
> - **ES7 React/Redux/GraphQL/React-Native snippets**

## 项目结构

### 目录结构

```
├── /.vscode/                    # vscode 配置目录，包含常用的代码片段、设置等
├── /@types/                     # 全局类型声明
├── /src/                        # 源码目录
│ ├── /assets/                   # 静态资源目录
│ ├── /components/               # 公共业务组件目录
│ ├── /constants/                # 项目 constants 目录
│ │ ├── _const.scss              # scss 常量
│ │ └── Api.ts                   # API 常量
│ │ └── store.ts                 # store
│ │ └── router.ts                # 路由树
│ ├── /hooks/                    # hook 目录
│ ├── /layouts/                  # 布局目录
│ ├── /models/                   # 模型目录
│ ├── /pages/                    # 页面组件目录
│ ├── /services/                 # 请求服务目录
│ ├── /style/                    # 全局样式
│ ├── /utils/                    # utils 目录
│ │ ├── request.ts               # 基于 fetch 封装的 http 请求工具
│ │ ├── global.ts                # 公共方法库
│ └── index.tsx                  # 项目入口
```

## 开发

### 新增页面

这里的『页面』指配置了路由，能够通过链接直接访问的模块

#### 1. 新增 tsx、scss 文件

```diff
src
  models
  pages
+   NewPage.tsx
+   NewPage.module.scss
```

**NewPage.tsx** 部分代码

```tsx
export default function NewPage(props: NewPageProps) {
  return <div className={styles.wrap}>New Page</div>;
}
```

可以键入 `tsrfc` 快速生成模板代码，后面直接在列出代码片段快捷键，不再说明

#### 2. 将页面加入路由

修改 **constants/router.ts** 内容

```diff
export const router: MenuDataItem[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
    routes: [
      { path: '/dashboard/analysis', name: '分析页', component: Analysis },
    ],
  },
  ...
+  {
+    path: '/new',
+    name: '新页面',
+    icon: 'file',
+    component: NewPage,
+  },
]
```

修改好之后运行，可以看到如下效果
[]

### 新增公共业务组件

对于一些可能被多处引用的功能模块，建议提炼成公共业务组件统一管理。这些组件一般有以下特征：

- 只负责一块相对独立，稳定的功能；
- 没有单独的路由配置；
- 可能是纯静态的，也可能包含自己的 state，但不涉及 redux 的数据流，仅受父组件（通常是一个页面）传递的参数控制。
