declare interface Window {
  config: {
    version: string;
    systemName: string;
    debug: boolean;
  };
}

declare interface ResponseBody<T> {
  code: number;
  data: T;
}

declare interface ResponseStatus {
  loading: boolean;
  error: boolean;
}

declare interface ModalState<T> {
  initValue?: T;
  loading: boolean;
  visible: boolean;
}
