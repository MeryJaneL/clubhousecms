import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function LoginIndex() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_MRLOGIN_PROJECT_ID;
    const redirectUri = window.location.protocol + '//' + window.location.host + '/login/handler';

    const queryString = new URLSearchParams({
      client_id: projectId,
      redirect_uri: redirectUri,
    }).toString();

    const loginUrl = `https://mrlogin.io/login?${queryString}`;
    window.location.href = loginUrl;
  });

  return null;
}
