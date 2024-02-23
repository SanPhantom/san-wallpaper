import axios from 'axios';

const apiKey = import.meta.env.VITE_WALLPAPER_API_KEY;

const paperAxios = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_SERVER_HOST,
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
