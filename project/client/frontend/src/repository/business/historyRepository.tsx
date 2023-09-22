import { useAccessToken } from '../../data_source/apiInfo';
import {
  HistoryAllApi,
  HistoryDetailApi,
  HistorySearchApi,
  HistoryDeleteApi,
} from '../../data_source/business/historyApi';

export function HistoryAllapirepository(): void {
  const accessToken = useAccessToken();
  if (accessToken) {
    HistoryAllApi(accessToken);
  }
}

export function HistoryDetailApirepository(bookId: number): void {
  const accessToken = useAccessToken();
  if (accessToken) {
    HistoryDetailApi(accessToken, bookId);
  }
}

export function HistorySearchApirepository(keyword: string) {
  const accessToken = useAccessToken();
  if (accessToken) {
    return HistorySearchApi(accessToken, keyword);
  }
  return Promise.reject(new Error('No access token'));
}

export function HistoryDeleteApirepository(bookId: number) {
  const accessToken = useAccessToken();
  if (accessToken) {
    HistoryDeleteApi(accessToken, bookId);
  }
}
