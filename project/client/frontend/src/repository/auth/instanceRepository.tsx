/* eslint-disable */
import { ReactNode, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
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
    authorization_refresh: '',
  },
});

const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    instance.interceptors.request.use(
      config => {
        const accessToken = useAccessToken();
        const refreshToken = useRefreshToken();

        config.headers.authorization = `Bearer ${accessToken as string}`;
        config.headers.authorization_refresh = `Bearer ${
          refreshToken as string
        }`;

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
          console.log(error);
          //   const accessToken = useAccessToken();
          //   const refreshToken = useRefreshToken();
          const nickname = useNickname();
          //   //   console.log(accessToken);
          //   //   console.log(refreshToken);
          //   //   console.log(nickname);
          const newConfig = {
            ...error.config,
            headers: {
              ...error.config.headers,
              // 'Content-Type': 'application/json',
              // Authorization: `Bearer ${accessToken as string}`,
              // Authorization_refresh: `Bearer ${refreshToken as string}`,
            },
          };

          dispatch(
            setTokens(
              newConfig.headers.authorization.split(' ')[1],
              newConfig.headers.authorization_refresh.split(' ')[1],
              nickname as string,
            ),
          );
          const response = await axios.request(newConfig);

          return response;
        }
        return Promise.reject(error);
      },
    );
  }, []);
  return <>{children}</>;
};

export { AxiosInterceptor };
export default instance;
