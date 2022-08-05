import PeopleTypeORM from '../../Entity/People.typeorm';
import IPeopleRepository from '../../Repositories/IPeopleRepository';

class ListAllPeopleUseCase {
  constructor(private repository: IPeopleRepository) {}
  async execute(): Promise<PeopleTypeORM[]> {
    return await this.repository.findAll();
  }
}

export default ListAllPeopleUseCase;
