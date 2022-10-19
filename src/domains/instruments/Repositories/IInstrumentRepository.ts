import InstrumentTypeORM from '../Entity/Instrument.typeorm';

export default interface IInstrumentsRepository {
  create(instrument: InstrumentTypeORM): Promise<InstrumentTypeORM>;
  findAll(): Promise<InstrumentTypeORM[]>;
  findById(id: string): Promise<InstrumentTypeORM | null>;
  findByName(name: string): Promise<InstrumentTypeORM | null>;
}
