/* eslint-disable */
import { ReactNode, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  useAccessToken,
  useRefreshToken,
  useNickname,
} from '../../data_source/apiInfo';
import { useDispatch } from 'react-redux';
import { setTokens } from '../../store/store';

const instance = axios.create({
  timeout: 300,
  headers: {
    'Content-Type': 'application/json',
    authorization: '',
  },
});

const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
  // let newAccessToken = '';
  // let newRefreshToken = '';
  const nickname = useNickname();
  const accessToken = useAccessToken();
  const refreshToken = useRefreshToken();

  const dispatch = useDispatch();
  const handleResponse = (response: AxiosResponse) => {
    const newAccessToken = response.headers.authorization;
    const newRefreshToken = response.headers.authorization_refresh;
    dispatch(setTokens(newAccessToken, newRefreshToken, nickname as string));
  };

  useEffect(() => {
    instance.interceptors.request.use(
      config => {
        const accessToken = useAccessToken();
        // const refreshToken = useRefreshToken();

        config.headers.authorization = `Bearer ${accessToken as string}`;
        // config.headers.authorization_refresh = `Bearer ${
        //   refreshToken as string
        // }`;

        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    instance.interceptors.response.use(
      response => {
        return response;
      },
      async (error: AxiosError) => {
        if (error.response?.status === 404) {
          window.location.href = '/error';
        }
        if (error.response?.status === 401 && error.config) {
          const { method, url: endPoint } = error.config;
          const headers = {
            Authorization: `Bearer ${accessToken as string}`,
            Authorization_refresh: `Bearer ${refreshToken as string}`,
          };

          if (method === 'get') {
            axios[method](endPoint as string, { headers })
              .then(response => {
                handleResponse(response);
              })
              .catch(e => {
                console.log(e);
              });
          } else if (method === 'post') {
            axios[method](endPoint as string, {}, { headers })
              .then(response => {
                handleResponse(response);
              })
              .catch(e => {
                console.log(e);
              });
          }
          return error;
        }
        return Promise.reject(error);
      },
    );
  }, []);
  return <>{children}</>;
};

export { AxiosInterceptor };
export default instance;
