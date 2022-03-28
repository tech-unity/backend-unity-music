import Instrument, { InstrumentProps } from '../../Entity/Instrument';
import CreateInstrumentException from '../../Exceptions/CreateInstrumentException';
import IInstrumentRepository from '../../Repositories/IInstrumentRepository';

class CreateInstrumentUseCase {
  constructor(private repository: IInstrumentRepository) {}

  async execute(props: InstrumentProps): Promise<Instrument> {
    if (!props) throw new CreateInstrumentException('Invalid properties');

    const instrument = new Instrument(props);
    await this.repository.create(instrument);
    return instrument;
  }
}

export default CreateInstrumentUseCase;
