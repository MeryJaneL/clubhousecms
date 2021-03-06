/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { buildSchemaSync, NonEmptyArray } from 'type-graphql';
import { OpenAPI, useSofa } from 'sofa-api';
import * as path from 'path';
import { parseAuthHeader } from './lib/parseAuthHeader';
import { connectDatabase } from './lib/connectDatabase';
import multer from 'multer';
import handleUploadToFileSystem from './lib/handleUploadToFileSystem';
import permissions from './permissions';
import './lib/firebase';

const SOFA_BASE_PATH = '/api';

const upload = multer({
  dest: 'uploads/',
  limits: { fieldSize: 25 * 1024 * 1024 },
});

/**
 * GraphQL Resolver 에 해당하는 모든 파일을 가져옵니다.
 *
 * @author BounceCode, Inc.
 */
const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  __dirname + '/models/**/*.resolver.{ts,js}',
];

/**
 * {@link resolvers} 에 해당하는 모든 파일을 GraphQL Resolver 로 선언합니다.
 * GraphQL Resolver 는 {@link permissions} 의 규칙을 통과해야 실행됩니다.
 *
 * @author BounceCode, Inc.
 */
const schema = applyMiddleware(
  buildSchemaSync({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, 'generated/schema.gql'),
  }),
  permissions
);

const openApi = OpenAPI({
  schema,
  info: {
    // title: 'Example API',
    // version: '3.0.0',
  },
});

/**
 * Context 에 대한 interface 입니다.
 *
 * @name user 인증된 사용자인 경우 사용자 정보가 담겨있습니다.
 * @author BounceCode, Inc.
 */
export interface Context {
  user?: any;
}

/**
 * {@link connectDatabase} 로 데이터베이스와 연결하고
 * {@link parseAuthHeader} 로 인증 권한을 확인하는 함수입니다.
 * 인증 정보를  {@link Context.user} 에 저장합니다.
 *
 * @author BounceCode, Inc.
 */
const context = async ({ req }: { req: any }): Promise<Partial<Context>> => {
  await connectDatabase();
  const user = await parseAuthHeader(req.headers.authorization);
  return { ...req, user };
};

/**
 * GraphQL 서버를 실행합니다.
 *
 * @author BounceCode, Inc.
 */
const server = new ApolloServer({
  schema,
  context,
});

/**
 * Express 서버를 실행합니다.
 *
 * @author BounceCode, Inc.
 */
export default async function createExpressApp() {
  const expressApp = express();

  // parse application/x-www-form-urlencoded
  expressApp.use(express.urlencoded({ extended: true }));

  // parse application/json
  expressApp.use(express.json());

  expressApp.post('/upload', upload.single('file'), handleUploadToFileSystem);

  expressApp.use('/uploads', express.static('uploads'));

  expressApp.use(
    SOFA_BASE_PATH,
    useSofa({
      schema,
      context,
      basePath: SOFA_BASE_PATH,
      onRoute(info) {
        openApi.addRoute(info, {
          basePath: SOFA_BASE_PATH,
        });
      },
    })
  );

  expressApp.get('/openapi.json', (req, res) => {
    return res.send(openApi.get());
  });

  await server.start();
  server.applyMiddleware({ app: expressApp });

  return expressApp;
}
