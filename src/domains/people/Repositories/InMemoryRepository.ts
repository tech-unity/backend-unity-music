import PeopleTypeORM from '../Entity/People.typeorm';
import CreatePeopleException from '../Exceptions/CreateUserException';
import PeopleNotFoundException from '../Exceptions/PeopleNotFoundException';
import IPeopleRepository from './IPeopleRepository';

export default class InMemoryPeopleRepository implements IPeopleRepository {
  static mock: Array<PeopleTypeORM> = [];
  create(person: PeopleTypeORM): Promise<PeopleTypeORM> {
    const foundId = InMemoryPeopleRepository.mock.some(
      register => register.id === person.id
    );

    if (foundId) {
      throw new CreatePeopleException('Person already exists');
    }

    InMemoryPeopleRepository.mock.push(person);
    return Promise.resolve(person);
  }
  findAll(): Promise<PeopleTypeORM[]> {
    return Promise.resolve(InMemoryPeopleRepository.mock);
  }

  findById(id: string): Promise<PeopleTypeORM> {
    const found = InMemoryPeopleRepository.mock.find(
      element => element.id === id
    );
    if (!found) {
      throw new PeopleNotFoundException(
        `Person of id ${id} could not be found`
      );
    }
    return Promise.resolve(found);
  }
}
