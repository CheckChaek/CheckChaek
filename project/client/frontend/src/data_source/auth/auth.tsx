import axios from 'axios';
import { AUTH_URI } from '../apiInfo';

interface Auth {
  token: string | null;
  dispatch: () => void;
}

function GetLogout({ token, dispatch }: Auth): void {
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

export default GetLogout;
