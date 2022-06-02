import { Repository } from 'typeorm';
import { AppDataSource } from '../../../infrastructure/AppDataSource';
import Instrument from '../../instruments/Entity/Instrument';
import InstrumentTypeORM from '../../instruments/Entity/Instrument.typeorm';
import InstrumentNotFoundException from '../../instruments/Exceptions/InstrumentNotFoundException';
import People, { Gender } from '../../people/Entity/People';
import PeopleTypeORM from '../../people/Entity/People.typeorm';
import PeopleNotFoundException from '../../people/Exceptions/PeopleNotFoundException';
import Scale from '../Entity/Scale';
import ScaleTypeORM, { BandTypeORM } from '../Entity/Scale.typeorm';
import CreateScaleException from '../Exceptions/CreateScaleException';
import IScaleRepository from './IScaleRepository';

export default class PostgresScaleRepository implements IScaleRepository {
  private repository: Repository<ScaleTypeORM>;
  private peopleRepository: Repository<PeopleTypeORM>;
  private instrumentRepository: Repository<InstrumentTypeORM>;
  private bandRepository: Repository<BandTypeORM>;

  constructor() {
    this.repository = AppDataSource.getRepository(ScaleTypeORM);
    this.peopleRepository = AppDataSource.getRepository(PeopleTypeORM);
    this.instrumentRepository = AppDataSource.getRepository(InstrumentTypeORM);
    this.bandRepository = AppDataSource.getRepository(BandTypeORM);
  }

  async create(scale: Scale): Promise<Scale> {
    const foundDate = await this.repository.findOneBy({ date: new Date(scale.getDate).toLocaleDateString() });
    if (foundDate) {
      throw new CreateScaleException(`A scale to date [ ${new Date(scale.getDate).toLocaleDateString()} ] already exists`);
    }

    const typeORMEntity = await this.toTypeORM(scale);

    // Garantindo que tudo ocorra numa transaction
    return this.repository.manager.transaction(async () => {
      for (const band of typeORMEntity.band) {
        await this.bandRepository.save(band);
      }
      const scaleTypeORM = await this.repository.save(typeORMEntity);

      return this.toDomainModel(scaleTypeORM);
    });
  }

  async findAll(): Promise<Scale[]> {
    const response = await this.repository.find({
      relations: {
        band: {
          instrument: true,
          person: true,
        },
        singers: true,
      },
    });
    return response.map(scale => this.toDomainModel(scale));
  }

  private async toTypeORM(scale: Scale): Promise<ScaleTypeORM> {
    const scaleTypeORM = new ScaleTypeORM();
    scaleTypeORM.id = scale.getId;
    scaleTypeORM.date = new Date(scale.getDate).toLocaleDateString();
    scaleTypeORM.band = [];
    scaleTypeORM.singers = [];
    for (const singer of scale.getSingers) {
      const person = await this.peopleRepository.findOneBy({
        id: singer.getId,
      });
      if (!person) {
        throw new PeopleNotFoundException(
          `Person of id ${singer.getId} could not be found`
        );
      }
      scaleTypeORM.singers.push(person);
    }

    for (const band of scale.getBand) {
      const instrument = await this.instrumentRepository.findOneBy({
        id: band.instrument.getId,
      });
      if (!instrument) {
        throw new InstrumentNotFoundException(
          `Instrument of id ${band.instrument.getId} could not be found`
        );
      }
      const person = await this.peopleRepository.findOneBy({
        id: band.person.getId,
      });
      if (!person) {
        throw new PeopleNotFoundException(
          `Person of id ${band.person.getId} could not be found`
        );
      }
      const bandTypeORM = new BandTypeORM();
      bandTypeORM.instrument = instrument;
      bandTypeORM.person = person;

      scaleTypeORM.band.push(bandTypeORM);
    }
    return scaleTypeORM;
  }

  private toDomainModel(scaleTypeORM: ScaleTypeORM): Scale {
    return new Scale({
      id: scaleTypeORM.id,
      date: new Date(scaleTypeORM.date),
      band: scaleTypeORM.band
        ? scaleTypeORM.band.map(band => {
            return {
              instrument: new Instrument({
                id: band.instrument.id,
                name: band.instrument.name,
              }),
              person: new People({
                id: band.person.id,
                name: band.person.name,
                email: band.person.email,
                phone: band.person.phone,
                instruments: band.person.instruments?.map(instrument => {
                  return new Instrument({
                    id: instrument.id,
                    name: instrument.name,
                  });
                }),
                gender: band.person.gender as Gender,
                isMinister: band.person.isMinister,
              }),
            };
          })
        : [],
      singers: scaleTypeORM.singers
        ? scaleTypeORM.singers.map(person => {
            return new People({
              id: person.id,
              name: person.name,
              email: person.email,
              phone: person.phone,
              instruments: person.instruments?.map(instrument => {
                return new Instrument({
                  id: instrument.id,
                  name: instrument.name,
                });
              }),
              gender: person.gender as Gender,
              isMinister: person.isMinister,
            });
          })
        : [],
    });
  }
}
