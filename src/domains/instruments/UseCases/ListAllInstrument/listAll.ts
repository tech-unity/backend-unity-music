import InstrumentTypeORM from '../../Entity/Instrument.typeorm';
import IInstrumentRepository from '../../Repositories/IInstrumentRepository';

class ListAllUseCase {
  constructor(private repository: IInstrumentRepository) {}
  async execute(): Promise<InstrumentTypeORM[]> {
    return await this.repository.findAll();
  }
}

export default ListAllUseCase;
