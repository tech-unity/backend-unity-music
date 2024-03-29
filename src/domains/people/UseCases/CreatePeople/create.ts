import InstrumentNotFoundException from '../../../instruments/Exceptions/InstrumentNotFoundException';
import IInstrumentsRepository from '../../../instruments/Repositories/IInstrumentRepository';
import { PeopleProps } from '../../Entity/People.props';
import PeopleTypeORM from '../../Entity/People.typeorm';
import IPeopleRepository from '../../Repositories/IPeopleRepository';
import CreateValidator from '../../Validations/createValidator';

export default class CreateUseCase {
  constructor(
    private repository: IPeopleRepository,
    private instrumentRepository: IInstrumentsRepository,
    private createValidator: CreateValidator
  ) {}

  async execute(props: PeopleProps): Promise<PeopleTypeORM> {
    await this.createValidator.execute(props);

    const person = new PeopleTypeORM();
    person.name = props.name;
    person.email = props.email;
    person.phone = props.phone;
    person.isMinister = props.isMinister;
    person.instruments = [];
    if (props.instruments) {
      for (let index = 0; index < props.instruments.length; index++) {
        const instrument = await this.instrumentRepository.findById(
          props.instruments[index]
        );
        if (!instrument) {
          throw new InstrumentNotFoundException(
            `Instrument of ${props.instruments[index]} could not be found`
          );
        }
        person.instruments.push(instrument);
      }
    }

    person.gender = props.gender;
    return await this.repository.create(person);
  }
}
