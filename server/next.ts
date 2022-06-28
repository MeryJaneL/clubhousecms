/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import * as url from 'url';
import next from 'next';
import createExpressApp from './express';

/**
 * 개발환경인지 여부를 확인합니다.
 *
 * @author BounceCode, Inc.
 */
const dev = process.env.NODE_ENV === 'development';

/**
 * Next.js SSR 서버를 설정합니다.
 *
 * @author BounceCode, Inc.
 */
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * Next.js 를 {@link expressApp} 으로 실행합니다.
 *
 * @author BounceCode, Inc.
 */
const nextApp = async () => {
  await app.prepare();

  const expressApp = await createExpressApp();

  expressApp.get('*', (req: any, res: any) => {
    const parsedUrl = url.parse(req.url, true);
    return handle(req, res, parsedUrl);
  });

  return expressApp;
};

export default nextApp;
