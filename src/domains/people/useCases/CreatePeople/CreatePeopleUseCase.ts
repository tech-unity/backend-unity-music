import People, { PeopleProps } from '../../Entity/People';
import IPeopleRepository from '../../Repositories/IPeopleRepository';

class CreatePeopleUseCase {
  constructor(private repository: IPeopleRepository) {}

  execute(props: PeopleProps): People {
    if (!props) throw new Error('Requisition body invalid');

    const people = People.create(props);
    this.repository.create(people);
    return people;
  }
}

export default CreatePeopleUseCase;
