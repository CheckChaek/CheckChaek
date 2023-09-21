import axios from 'axios';
import { AUTH_URI, useAccessToken } from '../apiInfo';

interface Auth {
  dispatch: () => void;
}

function GetLogout({ dispatch }: Auth): void {
  const token = useAccessToken();

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
      .then(r => {
        console.log(r);
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

export default GetLogout;
