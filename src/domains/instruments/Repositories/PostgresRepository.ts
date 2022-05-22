import { Repository } from 'typeorm';
import { AppDataSource } from '../../../infrastructure/AppDataSource';
import Instrument from '../Entity/Instrument';
import InstrumentTypeORM from '../Entity/Instrument.typeorm';
import CreateInstrumentException from '../Exceptions/CreateInstrumentException';
import IInstrumentRepository from './IInstrumentRepository';

export default class PostgresInstrumentRepository
  implements IInstrumentRepository
{
  private repository: Repository<InstrumentTypeORM>;

  constructor() {
    this.repository = AppDataSource.getRepository(InstrumentTypeORM);
  }

  async create(instrument: Instrument): Promise<Instrument> {
    const foundId = await this.repository.findOneBy({ id: instrument.getId });
    if (foundId) {
      throw new CreateInstrumentException('Instrument already exists');
    }

    const entity = new InstrumentTypeORM();
    entity.id = instrument.getId;
    entity.name = instrument.getName;
    await this.repository.save(entity);

    return new Instrument({ id: entity.id, name: entity.name });
  }

  async findAll(): Promise<Instrument[]> {
    const response = await this.repository.find();
    return response.map(entity => {
      return new Instrument({ id: entity.id, name: entity.name });
    });
  }

  findById(id: string): Promise<Instrument> {
    throw new Error('Method not implemented.');
  }
}
