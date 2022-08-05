import { InstrumentProps } from '../Entity/Instrument.props';
import CreateInstrumentException from '../Exceptions/CreateInstrumentException';

export default class CreateValidator {
  execute(instrument: InstrumentProps) {
    if (!instrument) throw new CreateInstrumentException('Invalid properties');
    if (!instrument.name)
      throw new CreateInstrumentException('Name is required');
    if (instrument.name.trim().length === 0)
      throw new CreateInstrumentException('Name may not be empty');
  }
}
