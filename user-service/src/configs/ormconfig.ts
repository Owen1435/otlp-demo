import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { entities } from '../entities';

dotenv.config({ path: '.env' });

export const dataSourceOptions: DataSourceOptions = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: false,
  synchronize: true,
  entities: entities,
};

const connectionSource = new DataSource(dataSourceOptions);

export default connectionSource;
