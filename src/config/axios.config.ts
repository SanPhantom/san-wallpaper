import axios from 'axios';

const apiKey = 'gKvVE331jp6UHELWNyP9XbMBxxR3JTGG';

const paperAxios = axios.create({
  baseURL: 'http://localhost:5188/',
  timeout: 600000,
});

paperAxios.interceptors.request.use((config) => {
  const { params } = config;

  config.params = {
    ...params,
    apikey: apiKey,
  };

  return config;
});

paperAxios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
    return Promise.reject(Error(response.status.toString()));
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default paperAxios;
