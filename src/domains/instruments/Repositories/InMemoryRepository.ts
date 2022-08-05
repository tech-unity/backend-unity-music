import InstrumentTypeORM from '../Entity/Instrument.typeorm';
import CreateInstrumentException from '../Exceptions/CreateInstrumentException';
import InstrumentNotFoundException from '../Exceptions/InstrumentNotFoundException';
import IInstrumentRepository from './IInstrumentRepository';

export default class InMemoryInstrumentRepository
  implements IInstrumentRepository
{
  static mock: Array<InstrumentTypeORM> = [];
  create(instrument: InstrumentTypeORM): Promise<InstrumentTypeORM> {
    const foundId = InMemoryInstrumentRepository.mock.some(
      register => register.id === instrument.id
    );

    if (foundId) {
      throw new CreateInstrumentException('Instrument already exists');
    }

    InMemoryInstrumentRepository.mock.push(instrument);
    return Promise.resolve(instrument);
  }

  findAll(): Promise<InstrumentTypeORM[]> {
    return Promise.resolve(InMemoryInstrumentRepository.mock);
  }

  findById(id: string): Promise<InstrumentTypeORM> {
    const found = InMemoryInstrumentRepository.mock.find(
      element => element.id === id
    );
    if (!found)
      throw new InstrumentNotFoundException(
        `Instrument of ${id} could not be found`
      );
    return Promise.resolve(found);
  }
}
