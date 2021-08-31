/// <reference types="react-scripts" />

declare module '*.module.less' {
  const classes: Record<string, string>;
  export default classes;
}

declare interface NodeModule {
  hot: any;
}

declare type ResponseData<T = any> = {
  code: number;
  data: T;
};
