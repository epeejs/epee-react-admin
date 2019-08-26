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
├── /@types/                     # 全局类型声明
├── /src/                        # 源码目录
│ ├── /actions/                  # action目录
│ ├── /assets/                   # 静态资源目录
│ ├── /components/               # 公共组件目录
│ ├── /constants/                # 项目constants目录
│ │ ├── _const.scss              # scss常量
│ │ ├── ActionTypes.ts           # ActionType常量
│ │ └── Api.ts                   # API常量
│ │ └── store.ts                 # store
│ ├── /pages/                    # UI组件目录
│ ├── /reducer/                  # reducer目录
│ ├── /services/                 # 请求服务目录
│ ├── /style/                    # 全局样式
│ ├── /utils/                    # utils目录
│ │ ├── request.ts               # 基于fetch封装的API请求工具
│ │ ├── global.ts                # 公共方法库
│ └── index.tsx                  # 项目入口
```
