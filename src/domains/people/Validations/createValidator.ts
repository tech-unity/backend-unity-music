import { PeopleProps } from '../Entity/People.props';
import CreatePeopleException from '../Exceptions/CreateUserException';
import IPeopleRepository from '../Repositories/IPeopleRepository';

export default class CreateValidator {
  constructor(private repository: IPeopleRepository) {}
  async execute(props: PeopleProps) {
    if (!props) throw new CreatePeopleException('Invalid properties');
    if (!props.name) throw new CreatePeopleException('Name is required');
    if (props.name.trim().length === 0)
      throw new CreatePeopleException('Name may not be empty');
    if (!props.email) throw new CreatePeopleException('Email is required');
    if (!props.gender) throw new CreatePeopleException('Gender is required');
    if (Boolean(props.isMinister) !== props.isMinister)
      throw new CreatePeopleException('IsMinister is required');
    const person = await this.repository.findByEmail(props.email);
    if (person) throw new CreatePeopleException('Person already exists');
  }
}
