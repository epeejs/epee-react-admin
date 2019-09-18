const baseUrl =
  'https://www.fastmock.site/mock/e24cdafccdc310a5f728225e4e0fa69f/epee';

export const Api = {
  POST_LOGIN: `${baseUrl}/login`,
  POST_SERVICE_LIST: `${baseUrl}/service-list/pageSize/:pageSize/page/:page`,
  GET_CHART_DATA: `${baseUrl}/chart/data`,
};
