import axios, { AxiosError } from 'axios';
import { AUTH_URI, useRefreshToken } from '../apiInfo';
import { AuthRequset } from '../../interface/api';

function SignoutAPI(token: string, { dispatch }: AuthRequset): void {
  const SignoutURI = `${AUTH_URI}/member`;
  if (token) {
    axios
      .delete(SignoutURI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch();
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
          // TokenExpired(token, refreshToken, SignoutURI, { dispatch });
        }
      });
  }
}

export default SignoutAPI;
