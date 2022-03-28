import People, { PeopleProps } from '../../Entity/People';
import CreatePeopleException from '../../Exceptions/CreateUserException';
import IPeopleRepository from '../../Repositories/IPeopleRepository';

class CreatePeopleUseCase {
  constructor(private repository: IPeopleRepository) {}

  async execute(props: PeopleProps): Promise<People> {
    if (!props) throw new CreatePeopleException('Invalid properties');

    const people = new People(props);
    await this.repository.create(people);
    return people;
  }
}

export default CreatePeopleUseCase;
