import axios, { AxiosError } from 'axios';
import { AUTH_URI, useNickname, useRefreshToken } from '../apiInfo';
import { AuthRequset } from '../../interface/api';
import { setTokens } from '../../store/store';
import { logout } from '../../store/actions/authActions';

function LogoutAPI(token: string, { dispatch }: AuthRequset): void {
  if (token) {
    axios
      .post(
        `${AUTH_URI}/auth/logout`,
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
        const refreshToken = useRefreshToken();
        if (
          refreshToken &&
          error.response &&
          (error.response.data as { message: string }).message ===
            '만료된 토큰입니다.'
        ) {
          axios
            .post(
              `${AUTH_URI}/auth/logout`,
              {},
              {
                headers: {
                  'Authorization-refresh': `Bearer ${refreshToken}`,
                  Authorization: `Bearer ${token}`,
                },
              },
            )
            .then(response => {
              console.log(response);
              const Rtoken = response.config.headers.Authorization as string;
              const newAccessToken = Rtoken.split(' ')[1];
              const nickname = '허재';
              if (newAccessToken && nickname && refreshToken) {
                dispatch(setTokens(newAccessToken, refreshToken, nickname));
                console.log(newAccessToken);
                axios
                  .post(
                    `${AUTH_URI}/auth/logout`,
                    {},
                    {
                      headers: {
                        Authorization: `Bearer ${newAccessToken}`,
                      },
                    },
                  )
                  .then(() => {
                    dispatch(logout());
                    setTimeout(() => {
                      window.location.href = '/';
                    }, 100);
                  })
                  .catch(() => {});
              }
            })
            .catch(() => {});
        }
      });
  }
}

export default LogoutAPI;
