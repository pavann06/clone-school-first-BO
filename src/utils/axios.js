import axios from 'axios';

import request from 'src/api/request';

import { API_BASE_URL } from '../config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: API_BASE_URL });

axiosInstance.interceptors.request.use((config) => {
  let auth = localStorage.getItem('auth_info');
  if (auth) {
    auth = JSON.parse(token);
    const token = `Bearer ${auth.access_token}`;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  try {
    const data = await request.get(url, config);
    console.log(`FETCHER-${url}`, data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  contact: {
    list: '/api/contacts/list',
    details: '/api/contacts/details',
    search: '/api/contacts/search',
  },
};
