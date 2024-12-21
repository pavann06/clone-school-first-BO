import axios from 'axios';

import { API_BASE_URL } from '../config-global';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

function getToken() {
  let auth = localStorage.getItem('auth_info');
  if (auth) {
    auth = JSON.parse(auth);
    const token = `Bearer ${auth.access_token}`;
    return token;
  }
  return null;
}

function getYear() {
  const year = localStorage.getItem('year');
  if (year) {
    return year;
  }
  return null;
}

const request = {
  get: async (endPoint, options = {}) => {
    try {
      let query = '?';
      Object.entries(options).forEach(([key, value]) => {
        if (Object.prototype.hasOwnProperty.call(options, key)) {
          query += `${key}=${value}&`;
        }
      });
      query = query.slice(0, -1);

      const token = getToken();
      if (token) {
        axios.defaults.headers.common.Authorization = token;
        axios.defaults.headers.common.year = getYear();
      }
      const response = await axios.get(endPoint + query);
      console.log(`FETCHER-${endPoint}`,options, response.data);
      return response.data;
    } catch (error) {
      console.log('error in get api', error);
      return null;
    }
  },

  post: async (endPoint, jsonData, withUpload = false) => {
    try {
      let config = {};
      if (withUpload) {
        config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      }
      const token = getToken();
      if (token) {
        axios.defaults.headers.common.Authorization = token;
      }
      const response = await axios.post(endPoint, jsonData, config);
      return response.data;
    } catch (error) {
      console.error('error in post api', error);
      return error;
    }
  },
  put: async (endPoint, jsonData, withUpload = false) => {
    try {
      let config = {};
      if (withUpload) {
        config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      }
      const token = getToken();
      if (token) {
        axios.defaults.headers.common.Authorization = token;
      }
      const response = await axios.put(endPoint, jsonData, config);

      return response.data;
    } catch (error) {
      console.error('error in put api', error);
      return error;
    }
  },
  delete: async (endPoint, jsonData) => {
    try {
      let url = endPoint;

      if (jsonData && Object.keys(jsonData).length > 0) {
        url += `?${new URLSearchParams(jsonData).toString()}`;
      }
      const token = getToken();
      if (token) {
        axios.defaults.headers.common.Authorization = token;
      }
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error('error in delete api', error);
      return error;
    }
  },
  UploadFiles: async (jsonData, withUpload = true) => {
    try {
      let config = {};
      if (withUpload) {
        config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      }
      const token = getToken();
      if (token) {
        axios.defaults.headers.common.Authorization = token;
      }
      const response = await axios.post('userservice/storage/upload', jsonData, config);

      return response.data;
    } catch (error) {
      console.error('error in file upload api', error);
      return error;
    }
  },
};
export default request;
