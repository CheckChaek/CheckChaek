import axios from 'axios';

import { Response } from '../../interface/api';
import { BUSINESS_URI, useAccessToken } from '../apiInfo';

const historyUri = `${BUSINESS_URI}/history`;
function HistoryAllApi() {
  const url = `${historyUri}/all`;
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
          return res.data as Response;
        }
        return res.statusText;
      })
      .catch(e => console.log(e));
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
          return res.data as Response;
        }
        return res.statusText;
      })
      .catch(e => console.log(e));
  }
}
function HistorySearchApi(keyword: string) {
  const url = `${historyUri}/search`;
  const accessToken = useAccessToken();
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
          return res.data as Response;
        }
        return res.statusText;
      })

      .catch(e => console.log(e));
  }
}

export { HistoryAllApi, HistoryDetailApi, HistorySearchApi };
