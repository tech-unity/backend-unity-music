import Instrument, { InstrumentProps } from '../Entity/Instrument';
import CreateInstrumentException from '../Exceptions/CreateInstrumentException';
import IInstrumentRepository from './IInstrumentRepository';

let mock: Array<any> = [];

export default class InMemoryInstrumentRepository
  implements IInstrumentRepository
{
  create(instrument: Instrument): Promise<any> {
    const foundId = mock.some(register => register.id === instrument.getId);

    if (foundId) {
      throw new CreateInstrumentException('Instrument already exists');
    }

    mock.push(instrument);
    return Promise.resolve(instrument);
  }
  findAll(): Promise<any> {
    return Promise.resolve(mock);
  }
}
