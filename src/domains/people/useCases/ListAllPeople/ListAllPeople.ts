import IPeopleRepository from '../../Repositories/IPeopleRepository';

class ListAllPeopleUseCase {
  constructor(private repository: IPeopleRepository) {}
  execute() {
    return Promise.resolve(this.repository.findAll());
  }
}

export default ListAllPeopleUseCase;
