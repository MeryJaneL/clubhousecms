/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import envConfig from 'env.config';
import ormConfig from 'ormconfig';
import { UserEntity } from 'server/models/User/entities/User.entity';
import {
  createConnection,
  getConnectionManager,
  BaseEntity,
  DataSource,
  DataSourceOptions,
} from 'typeorm';

/**
 * 데이터베이스와 연결하기위해 사용하는 함수입니다.
 * {@link expressApp} 에서 요청을 실행하기 전에 사용됩니다.
 *
 * @author BounceCode, Inc.
 */
export const connectDatabase = async () => {
  try {
    if (getConnectionManager().get().isConnected) {
      return;
    }
  } catch (e) {}

  const dataSourceOptions: DataSourceOptions = {
    ...ormConfig[0],
    type: 'postgres',
    port: Number(envConfig.DATABASE.port),
    password: String(envConfig.DATABASE.password),
  };

  const connection = new DataSource(dataSourceOptions);
  if (!connection.isInitialized) {
    await connection.initialize();
  }
};
