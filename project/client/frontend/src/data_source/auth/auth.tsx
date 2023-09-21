import axios from 'axios';
import { AUTH_URI } from '../apiInfo';
import { authRequset } from '../../interface/api';

function LogoutAPI(token: string, { dispatch }: authRequset): void {
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
        dispatch();
        setTimeout(() => {
          window.location.href = '/';
        }, 100);
      })
      .catch(() => {});
  }
}

export default LogoutAPI;
