import { InstrumentProps } from '../Entity/Instrument.props';
import CreateInstrumentException from '../Exceptions/CreateInstrumentException';
import IInstrumentsRepository from '../Repositories/IInstrumentRepository';

export default class CreateValidator {
  constructor(private instrumentRepository: IInstrumentsRepository) {
    
  }
  async execute(instrument: InstrumentProps) {
    const instrumentDb = await this.instrumentRepository.findByName(instrument.name);
    if (instrumentDb) {
      throw new CreateInstrumentException(`Instrument ${instrument.name} already exists`);
    }
    if (!instrument) throw new CreateInstrumentException('Invalid properties');
    if (!instrument.name)
      throw new CreateInstrumentException('Name is required');
    if (instrument.name.trim().length === 0)
      throw new CreateInstrumentException('Name may not be empty');
  }
}
