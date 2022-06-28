/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import { MutationResult } from '@apollo/client';
import gql from 'graphql-tag';
import jwt from 'jsonwebtoken';

export const GRAPHQL_URI = '/graphql';

type RefreshTokenMutation = {
  __typename?: 'Mutation';
  refreshToken: {
    __typename?: 'TokenObject';
    token?: string | null | undefined;
    accessToken?: string | null | undefined;
    refreshToken?: string | null | undefined;
    expiresIn?: number | null | undefined;
    tokenType?: string | null | undefined;
  };
};

const RefreshTokenDocument = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      accessToken
      refreshToken
      expiresIn
      tokenType
    }
  }
`;

const MUTATION_SIGNOUT = gql`
  mutation MUTATION_SIGNOUT {
    deleteAllTokens
  }
`;

/**
 * 웹브라우저에 저장되어있는 토큰을 초기화합니다.
 *
 * @author BounceCode, Inc.
 */
export const resetToken = async (client) => {
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('refresh_token');

  if (client) {
    try {
      await client.mutate({ mutation: MUTATION_SIGNOUT });
    } catch (e) {}
    client.cache.reset();
    await client.reFetchObservableQueries();
  }
};

/**
 * 웹브라우저에 토큰을 저장합니다.
 *
 * @author BounceCode, Inc.
 */
export const storeToken = async (
  client,
  { access_token = undefined, refresh_token = undefined }
) => {
  if (access_token) {
    window.localStorage.setItem('access_token', access_token);
  }

  if (refresh_token) {
    window.localStorage.setItem('refresh_token', refresh_token);
  }

  if (client) {
    client.cache.reset();
    await client.reFetchObservableQueries();
  }
};

export const getToken = async ({ access_token, refresh_token }, timeout = 600) => {
  if (access_token) {
    try {
      const { exp }: any = jwt.decode(access_token);

      if (Date.now() < (exp - timeout) * 1000) {
        return access_token;
      }
    } catch (e) {}
  }

  if (refresh_token) {
    const res = await fetch(process.env.NEXT_PUBLIC_MRLOGIN_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        operationName: null,
        query: RefreshTokenDocument.loc.source.body,
        variables: {
          refreshToken: refresh_token,
        },
      }),
    });

    const { data }: MutationResult<RefreshTokenMutation> = await res.json();
    const access_token = data.refreshToken.accessToken;
    storeToken(null, { access_token });
    return access_token;
  }
};
