import Instrument, { InstrumentProps } from '../Entity/Instrument';

export default interface IInstrumentsRepository {
  create(props: Instrument): Promise<any>;
  findAll(): Promise<any>;
}
