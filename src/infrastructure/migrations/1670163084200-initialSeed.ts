import dayjs from 'dayjs';
import { MigrationInterface, QueryRunner } from 'typeorm';
import InstrumentTypeORM from '../../domains/instruments/Entity/Instrument.typeorm';
import PeopleTypeORM from '../../domains/people/Entity/People.typeorm';
import ScaleTypeORM, {
  BandTypeORM
} from '../../domains/scales/Entity/Scale.typeorm';
import toPostgresDate from '../../utils/toPostgresDate';
import { AppDataSource } from '../AppDataSource';
import { instrumentSeed, personSeed } from '../seed/scale.seed';

export class initialSeed1670163084200 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const scaleRepository = await AppDataSource.getRepository(ScaleTypeORM);
    const peopleRepository = await AppDataSource.getRepository(PeopleTypeORM);
    const bandRepository = await AppDataSource.getRepository(BandTypeORM);
    const instrumentRepository = await AppDataSource.getRepository(
      InstrumentTypeORM
    );

    // creating instruments first
    const instruments = await instrumentRepository.save(instrumentSeed);
    // creating people
    const peopleSeed = personSeed;
    peopleSeed[2].instruments = instruments[1];
    peopleSeed[3].instruments = instruments[0];
    const people = await peopleRepository.save(peopleSeed);

    // creating bands
    const band = await bandRepository.save([
      { instrument: instruments[0], person: people[3] },
      { instrument: instruments[1], person: people[2] },
    ]);

    // creating scales associating all them
    const scales = [
      {
        singers: [people[0], people[1]],
        date: toPostgresDate(new Date()),
        band,
      },
      {
        singers: [people[0], people[1]],
        date: toPostgresDate(new Date(dayjs(new Date()).add(7, 'day').toString())),
        band,
      },
    ];

    await scaleRepository.save(scales);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
