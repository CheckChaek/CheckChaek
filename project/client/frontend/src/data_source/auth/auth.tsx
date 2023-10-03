import { AxiosError } from 'axios';
import { AUTH_URI, useAccessToken } from '../apiInfo';
import { AuthRequset } from '../../interface/api';
import { logout } from '../../store/actions/authActions';
import instance from '../../repository/auth/instanceRepository';

function LogoutAPI(token: string, { dispatch }: AuthRequset): void {
  const logoutURI = `${AUTH_URI}/auth/logout`;
  if (token) {
    instance
      .post(
        logoutURI,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        dispatch(logout());
        setTimeout(() => {
          window.location.href = '/';
        }, 100);
      })
      .catch((error: AxiosError) => {
        // const accessToken = useAccessToken();
        // if (error.config && accessToken) {
        //   const newConfig = {
        //     ...error.config,
        //     headers: {
        //       ...error.config.headers,
        //       'Content-Type': 'application/json',
        //       authorization: `Bearer ${accessToken}`,
        //     },
        //   };
        //   instance.request(newConfig).then(() => {
        //     console.log('로그아웃중');
        //     dispatch(logout());
        //     setTimeout(() => {
        //       // window.location.href = '/';
        //     }, 100);
        //   });
        // }
      });
  }
}

export default LogoutAPI;
