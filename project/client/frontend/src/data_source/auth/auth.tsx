import axios from 'axios';
import { AUTH_URI } from '../apiInfo';

interface Logout {
  token: string | null;
  dispatch: () => void;
}

function GetLogout({ token, dispatch }: Logout): void {
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
      })
      .catch(() => {});
  }
}

export default GetLogout;
