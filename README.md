## 💡 预览

水平布局 (master)：https://epee.netlify.app/
![hlayout](https://raw.githubusercontent.com/dobble11/aseets/master/hlayout.png)

垂直布局 ([dev-vertical-layout](https://github.com/dobble11/epee-react-admin-ts/tree/dev-vertical-layout))：https://vepee.netlify.app/
![vlayout](https://raw.githubusercontent.com/dobble11/aseets/master/vlayout.png)

## 🚀 特性

- 零配置
- 无模版代码
- 使用 React Hooks 开发
- 基于 easy-peasy 的状态管理
- 完善的类型检查及 lint 规则，保证代码风格的一致及质量
- docker 部署支持
- [在线数据 mock](https://github.com/dobble11/epee-react-admin-ts/blob/master/docs/简单的在线数据mock.md)

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
> - **Auto Import**
> - **Auto Rename Tag**
> - **CSS Modules**
> - **Paste JSON as Code**
> - **Path Intellisense**
> - **ES7 React/Redux/GraphQL/React-Native snippets**

## 🌳 目录结构

```sh
├── /.vscode/                    # vscode 配置目录，包含常用的代码片段、设置等
├── /@types/                     # 全局类型声明
├── /src/                        # 源码目录
│ ├── /assets/                   # 静态资源目录
│ ├── /components/               # 公共业务组件目录
│ ├── /constants/                # constant 目录
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
│ ├── /utils/                    # util 目录
│ │ ├── request.ts               # 基于 fetch 封装的 http 请求工具
│ │ ├── global.ts                # 公共方法库
│ └── index.tsx                  # 项目入口
```

## ⚒ 开发

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

**NewPage.tsx** 部分代码如下：

```tsx
export default function NewPage(props: NewPageProps) {
  return <div className={styles.wrap}>New Page</div>;
}
```

可以键入 `tsrfc` 快速生成模板代码，后面直接列出代码片段快捷键，不再说明

#### 2. 将页面加入路由

修改 **constants/router.ts** 内容

```diff
export const router: RouteNode[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardOutlined,
    routes: [
      { path: '/dashboard/analysis', name: '分析页', component: Analysis },
    ],
  },
  ...
+  {
+    path: '/new',
+    name: '新页面',
+    icon: FileOutlined,
+    component: NewPage,
+  },
]
```

修改好之后运行，可以看到如下效果

![preview](https://raw.githubusercontent.com/dobble11/aseets/master/newpage.png)

### 引入数据流

> 状态管理使用 **easy-peasy**，更多用法参考[官方文档](https://easy-peasy.now.sh)

下面演示表格组件开发流程

1. 增加服务请求路径，修改 **constants/Api.ts** 文件

```diff
export const Api = {
+  POST_SERVICE_LIST: `${baseUrl}/service-list/pageSize/:pageSize/page/:page`,
};
```

按照约定，路径名以大写及请求类型开头命名

2. 依据接口文档，编写请求服务，新建 **services/table-list.service.ts** 文件（快捷键：tsreq），部分代码如下：

```ts
import { Api } from 'src/constants/Api';
import request from 'src/utils/request';

export const getServiceList = (
  filter: Omit<ServiceFilter, keyof PageParams>,
  router: PageParams,
) =>
  request<ResponseBody<PageData<Service>>>(Api.POST_SERVICE_LIST, {
    method: 'post',
    router,
    body: JSON.stringify(filter),
  });
```

3. 新建 **models/table-list.model.ts** 文件（快捷键：tsmodel），编写对应 state、action 处理数据变化，并定义对应类型用于类型检查，部分代码如下：

```ts
import { Action, action, ActionTypes, Thunk, thunk } from 'easy-peasy';
import { getServiceList } from 'src/services/table-list.service';

export interface TableListModel {
  data: PageData<Service>;
  filter: ServiceFilter;
  modifyFilter: Action<TableListModel, Partial<ServiceFilter>>;
  resetFilter: Action<TableListModel>;
  setData: Action<TableListModel, PageData<Service>>;
  fetchServiceList: Thunk<TableListModel>;
}

const initState: O.Filter<TableListModel, ActionTypes> = {
  data: {
    list: [],
    total: 0,
  },
  filter: {
    name: '',
    updateDate: '',
    page: 1,
    pageSize: 10,
  },
};

export const tableListModel: TableListModel = {
  ...initState,
  // 快捷键：act
  modifyFilter: action((state, payload) => {
    state.filter = { ...state.filter, ...payload };
  }),
  resetFilter: action(state => {
    state.filter = initState.filter;
  }),
  setData: action((state, payload) => {
    state.data = payload;
  }),
  // 快捷键：thunk
  fetchServiceList: thunk(async (actions, payload, { getState }) => {
    const { page, pageSize, ...otherFilter } = getState().filter;
    const res = await getServiceList(otherFilter, { page, pageSize });

    actions.setData(res.data);
  }),
};
```

引入 model，修改 **models/index.ts** 内容

```diff
+import { tableListModel, TableListModel } from './table-list.model';

export interface StoreModel {
+  tableListModel: TableListModel;
}

export const storeModel: StoreModel = {
+  tableListModel,
};
```

4. 业务组件使用 demo

```tsx
import { useStoreActions, useStoreState } from 'src/hooks';

const TableList: React.FC<TableListProps> = props => {
  // 快捷键：cus
  const {
    data: { total, list },
    filter,
  } = useStoreState(state => state.tableListModel);
  // 快捷键：cua
  const { setFilter, resetFilter, fetchServiceList } = useStoreActions(
    actions => actions.tableListModel,
  );
  const [state, fetch] = useAsyncFn(() => fetchServiceList());

  useEffect(() => {
    fetch();
  }, [fetch, filter]);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <Button type="primary">查询</Button>
        <Button onClick={() => resetFilter()}>重置</Button>
      </div>
      <Table
        columns={columns}
        dataSource={list}
        loading={state.loading}
        pagination={{
          total,
          pageSize: filter.pageSize,
          current: filter.page,
          showSizeChanger: true,
          onChange(curr) {
            modifyFilter({ page: curr });
          },
          onShowSizeChange(curr, size) {
            modifyFilter({ page: 1, pageSize: size });
          },
        }}
      />
    </div>
  );
};
```

### 公共业务组件

对于一些可能被多处引用的功能模块，建议提炼成公共业务组件统一管理。这些组件一般有以下特征：

- 只负责一块相对独立，稳定的功能
- 没有单独的路由配置
- 可能是纯静态的，也可能包含自己的 state，但不涉及 redux 的数据流，仅受父组件（通常是一个页面）传递的参数控制

如 echart

## 布局与路由
