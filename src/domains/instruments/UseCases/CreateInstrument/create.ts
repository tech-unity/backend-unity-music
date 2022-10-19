import { NextFunction } from 'express';
import { InstrumentProps } from '../../Entity/Instrument.props';
import InstrumentTypeORM from '../../Entity/Instrument.typeorm';
import IInstrumentRepository from '../../Repositories/IInstrumentRepository';
import CreateValidation from '../../Validations/createValidator';

export default class CreateUseCase {
  constructor(
    private repository: IInstrumentRepository,
    private validator: CreateValidation
  ) {}

  async execute(props: InstrumentProps): Promise<InstrumentTypeORM> {
    await this.validator.execute(props);

    const instrument = new InstrumentTypeORM();
    instrument.name = props.name;
    return await this.repository.create(instrument);
  }
}
