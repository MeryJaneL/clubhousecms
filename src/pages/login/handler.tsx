import { useApolloClient } from '@apollo/client';
import { storeToken } from 'client/utils-v2/token';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function LoginHandler() {
  const router = useRouter();
  const client = useApolloClient();

  const handleLogin = async ({ access_token, refresh_token }) => {
    storeToken(client, { access_token, refresh_token });
    router.replace('/');
  };

  useEffect(() => {
    const parsedUrl = new URL(window.location.href);
    const access_token = parsedUrl.searchParams.get('access_token');
    const refresh_token = parsedUrl.searchParams.get('refresh_token');
    handleLogin({ access_token, refresh_token });
  });

  return null;
}
