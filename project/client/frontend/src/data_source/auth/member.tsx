import axios from 'axios';
import { AUTH_URI } from '../apiInfo';

interface SignOut {
  token: string | null;
  dispatch: () => void;
}

function GetSignout({ token, dispatch }: SignOut): void {
  if (token) {
    axios
      .delete(`${AUTH_URI}/member`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch();
        window.location.href = '/';
      })
      .catch(() => {});
  }
}

export default GetSignout;
