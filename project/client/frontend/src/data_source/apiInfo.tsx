import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const BASE_URI = 'j9a606a.p.ssafy.io';

const BUSINESS_URI = `${BASE_URI}:8082/business`;
const AUTH_URI = `${BASE_URI}:8081`;

function useAccessToken(): string | null {
  const token: string | null = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  return token;
}

function useRefreshToken(): string | null {
  const token: string | null = useSelector(
    (state: RootState) => state.auth.refreshToken,
  );
  return token;
}

export { BUSINESS_URI, AUTH_URI, useAccessToken, useRefreshToken };
