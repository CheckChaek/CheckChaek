import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const BASE_URI = 'http://j9a606.p.ssafy.io';

const BUSINESS_URI = `${BASE_URI}:8082/business`;
const AUTH_URI = `${BASE_URI}:8081`;

function useAccessToken(): string | null {
  const storageValue = sessionStorage.getItem('persist:root') as string;
  if (storageValue) {
    const storageObject = JSON.parse(storageValue) as object;
    const authString = (storageObject as { auth: string }).auth;
    const authObject = JSON.parse(authString) as object;
    const token = (authObject as { accessToken: string }).accessToken;
    return token;
  }
  return null;
}

function useRefreshToken(): string | null {
  const token: string | null = useSelector(
    (state: RootState) => state.auth.refreshToken,
  );
  return token;
}

function useNickname(): string | null {
  const token: string | null = useSelector(
    (state: RootState) => state.auth.nickname,
  );
  return token;
}

export { BUSINESS_URI, AUTH_URI, useAccessToken, useRefreshToken, useNickname };
