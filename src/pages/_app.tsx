// scroll bar
import 'simplebar/src/simplebar.css';

// highlight
import '../utils/highlight';

// editor
import 'react-quill/dist/quill.snow.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import cookie from 'cookie';
import { ReactElement, ReactNode, useEffect } from 'react';
// next
import { NextPage } from 'next';
import Head from 'next/head';
import App, { AppProps, AppContext } from 'next/app';
// utils
import { getSettings } from '../utils/getSettings';
// contexts
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
// theme
import ThemeProvider from '../theme';
// components
import ThemeSettings from '../components/settings';
import { SettingsValueProps } from '../components/settings/type';
import ProgressBar from '../components/ProgressBar';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'client/utils-v2/apolloClient';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
//
import { Provider as ReduxProvider } from 'react-redux';

// redux
import { store } from '../redux/store';

// tailwind
import 'client/styles/globals.css';
import NotistackProvider from 'client/components/NotistackProvider';
import { AuthProvider } from 'client/contexts/JWTContext';
import { StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// ----------------------------------------------------------------------

const cache = createCache({
  key: 'mui',
  prepend: true,
});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  settings: SettingsValueProps;
  Component: NextPageWithLayout;
  cookies: NextApiRequestCookies;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, settings, cookies } = props;
  const apolloClient = useApollo(pageProps, cookies);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <ReduxProvider store={store}>
            <CollapseDrawerProvider>
              <SettingsProvider defaultSettings={settings}>
                <MotionLazyContainer>
                  <CacheProvider value={cache}>
                    <StyledEngineProvider injectFirst>
                      <ThemeProvider>
                        <ThemeSettings>
                          <NotistackProvider>
                            <ProgressBar />
                            {/* @ts-ignore */}
                            {getLayout(<Component {...pageProps} />)}
                          </NotistackProvider>
                        </ThemeSettings>
                      </ThemeProvider>
                    </StyledEngineProvider>
                  </CacheProvider>
                </MotionLazyContainer>
              </SettingsProvider>
            </CollapseDrawerProvider>
          </ReduxProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(
    context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie
  );

  const settings = getSettings(cookies);

  return {
    ...appProps,
    settings,
    cookies,
  };
};
