import axios from 'axios';
import { AUTH_URI } from '../apiInfo';
import { AuthRequset } from '../../interface/api';

function LogoutAPI(token: string, { dispatch }: AuthRequset): void {
  if (token) {
    console.log(token);
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
      .catch(error => {
        console.log(error);
      });
  }
}

export default LogoutAPI;
