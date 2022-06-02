import People from '../../Entity/People';
import IPeopleRepository from '../../Repositories/IPeopleRepository';

class ListAllPeopleUseCase {
  constructor(private repository: IPeopleRepository) {}
  execute(): Promise<People[]> {
    return Promise.resolve(this.repository.findAll());
  }
}

export default ListAllPeopleUseCase;
