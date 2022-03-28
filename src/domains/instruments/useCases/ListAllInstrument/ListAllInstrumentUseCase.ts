import Instrument from '../../Entity/Instrument';
import IInstrumentRepository from '../../Repositories/IInstrumentRepository';

class ListAllInstrumentUseCase {
  constructor(private repository: IInstrumentRepository) {}
  execute(): Promise<Instrument[]> {
    return Promise.resolve(this.repository.findAll());
  }
}

export default ListAllInstrumentUseCase;
