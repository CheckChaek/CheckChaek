import axios from 'axios';
import { AUTH_URI, useAccessToken } from '../apiInfo';

interface Auth {
  dispatch: () => void;
}

function GetSignout({ dispatch }: Auth): void {
  const token = useAccessToken();
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

export default GetSignout;
