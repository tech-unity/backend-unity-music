import 'reflect-metadata';
import { DataSource } from 'typeorm';
import InstrumentTypeORM from '../domains/instruments/Entity/Instrument.typeorm';
import PeopleTypeORM from '../domains/people/Entity/People.typeorm';
import ScaleTypeORM, { BandTypeORM } from '../domains/scales/Entity/Scale.typeorm';
import * as dotenv from 'dotenv'

dotenv.config();
export const AppDataSource = new DataSource({
  url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres',
  type: 'postgres',
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
