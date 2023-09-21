import axios from 'axios';
import { APIResponse } from '../../interface/api';
import { BUSINESS_URI, useAccessToken } from '../apiInfo';

const historyUri = `${BUSINESS_URI}/history`;
function HistoryAllApi() {
  const url = `${historyUri}/all`;
  const accessToken = useAccessToken();
  console.log(accessToken);
  if (accessToken) {
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          return res.data as APIResponse;
        }
        return res.statusText;
      })
      .catch(e => {
        console.log(e);
      });
  }
}

function HistoryDetailApi(bookId: number) {
  const url = `${historyUri}/${bookId}`;
  const accessToken = useAccessToken();
  if (accessToken) {
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          return res.data as APIResponse;
        }
        return res.statusText;
      })
      .catch(e => console.log(e));
  }
}
function HistorySearchApi(keyword: string) {
  const url = `${historyUri}/search`;
  const accessToken = sessionStorage.getItem('accessToken');
  if (accessToken) {
    axios
      .get(url, {
        params: { keyword },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          return res.data as APIResponse;
        }
        return res.statusText;
      })

      .catch(e => console.log(e));
  }
}

export { HistoryAllApi, HistoryDetailApi, HistorySearchApi };
