/// <reference types="vite/client" />

declare type ResponseData<T = any> = {
  code: number;
  data: T;
};
