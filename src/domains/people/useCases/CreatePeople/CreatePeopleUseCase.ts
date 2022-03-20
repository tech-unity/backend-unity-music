import People, { PeopleProps } from '../../Entity/People';
import IPeopleRepository from '../../Repositories/IPeopleRepository';

class CreatePeopleUseCase {
  constructor(private repository: IPeopleRepository) {}

  async execute(props: PeopleProps): Promise<People> {
    if (!props) throw new Error('Requisition body invalid');

    const people = new People(props);
    this.repository.create(people);
    return people;
  }
}

export default CreatePeopleUseCase;
