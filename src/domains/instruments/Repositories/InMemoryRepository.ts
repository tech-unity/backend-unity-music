import Instrument, { InstrumentProps } from '../Entity/Instrument';
import CreateInstrumentException from '../Exceptions/CreateInstrumentException';
import IInstrumentRepository from './IInstrumentRepository';


export default class InMemoryInstrumentRepository
implements IInstrumentRepository
{
  static mock: Array<any> = [];
  create(instrument: Instrument): Promise<any> {
    const foundId = InMemoryInstrumentRepository.mock.some(register => register.id === instrument.getId);

    if (foundId) {
      throw new CreateInstrumentException('Instrument already exists');
    }

    InMemoryInstrumentRepository.mock.push(instrument);
    return Promise.resolve(instrument);
  }

  findAll(): Promise<any> {
    return Promise.resolve(InMemoryInstrumentRepository.mock);
  }

  findById(id: string): Promise<Instrument> {
    return Promise.resolve(InMemoryInstrumentRepository.mock.find(element => element.id === id));
  }
}
