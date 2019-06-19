declare interface IResponseBody<T> {
  code: number;
  data: T;
}

declare interface IResponseStatus {
  loading: boolean;
  error: boolean;
}

declare interface IResponse<T> extends IResponseStatus {
  res: IResponseBody<T>;
}

declare interface IResponseNotPage<T> extends IResponseStatus {
  data: T;
}

declare interface IRequsetParams {
  page: number;
  pagesize: number;
  search: string;
}

declare interface IModalState<T> {
  initValue?: T;
  loading: boolean;
  visible: boolean;
}
