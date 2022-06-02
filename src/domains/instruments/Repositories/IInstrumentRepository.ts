import Instrument, { InstrumentProps } from '../Entity/Instrument';

export default interface IInstrumentsRepository {
  create(instrument: Instrument): Promise<Instrument>;
  findAll(): Promise<Instrument[]>;
  findById(id: string): Promise<Instrument>;
}
