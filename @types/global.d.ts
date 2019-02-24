declare const config: {
  version: string;
  systemName: string;
  debug: boolean;
  apiBaseURL: string;
  mapServer: {
    mapType: string;
    mapDefaultZoom: number;
    mapCenter: {
      lat: number;
      lng: number;
    };
    mapZoom: {
      minZoom: number;
      maxZoom: number;
    };
    serverUrl: {
      baiduOffline: {
        origin: string;
      };
      baiduOnline: {
        origin: string;
      };
      googleOnline: {
        origin: string;
        transforCoordinate: {
          lat: number;
          lng: number;
        };
      };
      googleOffline: {
        origin: string;
        transforCoordinate: {
          lat: number;
          lng: number;
        };
      };
    };
  };
};

declare type OptionalProps<V> = { [K in keyof V]?: V[K] };

declare interface IResponseBody<T> {
  data: T[];
  errCode: number;
  maxPage: number;
  total: number;
}
declare interface IResponseStatus {
  loading: boolean;
  error: boolean;
}
declare interface IResponse<T> extends IResponseStatus {
  res: IResponseBody<T> | null;
}
declare interface IRequsetParam {
  page: number;
  pageSize: number;
  search: string;
}
