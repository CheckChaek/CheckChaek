import axios from 'axios';
import { AUTH_URI } from '../apiInfo';
import { AuthRequset } from '../../interface/api';

function SignoutAPI(token: string, { dispatch }: AuthRequset): void {
  if (token) {
    axios
      .delete(`${AUTH_URI}/member`, {
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
      .catch(() => {});
  }
}

export default SignoutAPI;
