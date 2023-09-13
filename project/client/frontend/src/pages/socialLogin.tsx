import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTokens } from '../store/store';

function SocialLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('token');
      const refreshToken = urlParams.get('refreshToken');

      if (accessToken && refreshToken) {
        dispatch(setTokens(accessToken, refreshToken));
        window.location.replace('/');
      }
    };

    if (window.location.search.includes('token=')) {
      handleCallback();
    }
  }, [dispatch]);
  return <div />;
}

export default SocialLogin;
