window.config = {
  version: 'develop',
  systemName: '龙岗视频门禁',
  debug: false, // 是否启用 react-logger
  apiBaseURL: 'http://192.168.81.23:8083',
  mapServer: {
    mapType: 'baiduOnline', // googleOnline谷歌在线地图，googleOffline谷歌离线地图， baiduOnline百度在线地图，baiduOffline百度离线地图
    mapDefaultZoom: 14,
    mapCenter: {
      lat: 22.648365,
      lng: 114.102316
    },
    mapZoom: {
      minZoom: 6,
      maxZoom: 18
    },
    serverUrl: {
      baiduOffline: {
        origin: 'http://127.0.0.1/ifaas/mapapi/tiles/{z}/{x}/{y}.png' //注意ip和存放地图tile的路径以及离线地图的图片属性 jpg png
      },
      baiduOnline: {
        origin:
          'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20150518'
      },
      googleOnline: {
        origin:
          'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
        transforCoordinate: {
          //其他地图和百度点位的经纬度差
          lat: -0.00604391488360179,
          lng: -0.00649039475300128
        }
      },
      googleOffline: {
        origin: 'http://127.0.0.1/ifaas/mapapi/tiles/{z}/{x}/{y}.png', //注意ip和存放地图tile的路径以及离线地图的图片属性 jpg png
        transforCoordinate: {
          //其他地图和百度点位的经纬度差
          lat: -0.00604391488360179,
          lng: -0.00649039475300128
        }
      }
    }
  }
};
