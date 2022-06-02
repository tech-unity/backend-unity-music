import 'reflect-metadata';
import { DataSource } from 'typeorm';
import InstrumentTypeORM from '../domains/instruments/Entity/Instrument.typeorm';
import PeopleTypeORM from '../domains/people/Entity/People.typeorm';
import ScaleTypeORM, { BandTypeORM } from '../domains/scales/Entity/Scale.typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [InstrumentTypeORM, PeopleTypeORM, ScaleTypeORM, BandTypeORM],
  subscribers: [],
  migrations: [],
});
AppDataSource.initialize()
  .then()
  .catch(err => console.error(err));
