import axios from 'axios';
import { AUTH_URI } from '../apiInfo';

interface Auth {
  token: string | null;
  dispatch: () => void;
}

function GetSignout({ token, dispatch }: Auth): void {
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
