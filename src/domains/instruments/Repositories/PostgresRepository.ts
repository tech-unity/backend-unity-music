import { Repository } from 'typeorm';
import { AppDataSource } from '../../../infrastructure/AppDataSource';
import InstrumentTypeORM from '../Entity/Instrument.typeorm';
import CreateInstrumentException from '../Exceptions/CreateInstrumentException';
import InstrumentNotFoundException from '../Exceptions/InstrumentNotFoundException';
import IInstrumentRepository from './IInstrumentRepository';

export default class PostgresInstrumentRepository
  implements IInstrumentRepository
{
  private repository: Repository<InstrumentTypeORM>;

  constructor() {
    this.repository = AppDataSource.getRepository(InstrumentTypeORM);
  }

  async create(instrument: InstrumentTypeORM): Promise<InstrumentTypeORM> {
    return await this.repository.save(instrument);
  }

  async findAll(): Promise<InstrumentTypeORM[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<InstrumentTypeORM | null> {
    return await this.repository.findOneBy({ id });
  }

  async findByName(name: string): Promise<InstrumentTypeORM | null> {
    return await this.repository.findOneBy({ name });
  }
}
