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
    const foundId = await this.repository.findOneBy({ id: instrument.id });
    if (foundId) {
      throw new CreateInstrumentException('Instrument already exists');
    }
    return await this.repository.save(instrument);
  }

  async findAll(): Promise<InstrumentTypeORM[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<InstrumentTypeORM> {
    const instrument = await this.repository.findOneBy({ id });

    if (!instrument) {
      throw new InstrumentNotFoundException(
        `Instrument of id ${id} could not be found`
      );
    }
    return instrument;
  }
}
