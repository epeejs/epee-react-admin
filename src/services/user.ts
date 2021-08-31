import request from 'src/utils/request';

export const login = (data: any) =>
  request('/login', {
    method: 'POST',
    body: data,
  });

export const getAuthInfo = () => request('/authority');

export const getUserInfo = () => request('/user-info');
