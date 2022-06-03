import 'reflect-metadata';
import { DataSource } from 'typeorm';
import InstrumentTypeORM from '../domains/instruments/Entity/Instrument.typeorm';
import PeopleTypeORM from '../domains/people/Entity/People.typeorm';
import ScaleTypeORM, { BandTypeORM } from '../domains/scales/Entity/Scale.typeorm';
import * as dotenv from 'dotenv'

dotenv.config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_USER as string) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: 'postgres',
  synchronize: true,
  // logging: true,
  entities: [InstrumentTypeORM, PeopleTypeORM, ScaleTypeORM, BandTypeORM],
  subscribers: [],
  migrations: [],
});
AppDataSource.initialize()
  .then()
  .catch(err => console.error(err));
