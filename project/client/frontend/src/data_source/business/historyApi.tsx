import axios from 'axios';
import { APIResponse, HistoriesResponse } from '../../interface/api';
import { BUSINESS_URI } from '../apiInfo';

const historyUri = `${BUSINESS_URI}/history`;
function HistoryAllApi(token: string) {
  const url = `${historyUri}/all`;
  if (token) {
    axios
      .get<HistoriesResponse>(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.status === 200) {
          return response.data.data.history;
        }
        return response.statusText;
      })
      .catch(() => {});
  }
  return null;
}

function HistoryDetailApi(token: string, bookId: number) {
  const url = `${historyUri}/${bookId}`;
  if (token) {
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          return res.data as APIResponse;
        }
        return res.statusText;
      })
      .catch(() => {});
  }
  return null;
}
async function HistorySearchApi(token: string, keyword: string) {
  const url = `${historyUri}/search?keyword=${encodeURIComponent(keyword)}`;
  if (token) {
    try {
      const response = await axios.get<HistoriesResponse>(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data.data.history;
      }
      return response.statusText;
    } catch {
      window.location.href = '/error';
    }
  }
}

function HistoryDeleteApi(token: string, bookid: number) {
  const url = `${historyUri}/${bookid}`;
  if (token) {
    axios
      .delete(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {})

      .catch(() => {});
  }
}

export { HistoryAllApi, HistoryDetailApi, HistorySearchApi, HistoryDeleteApi };
