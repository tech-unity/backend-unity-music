import People, { PeopleProps } from '../Entity/People';
import CreatePeopleException from '../Exceptions/CreateUserException';
import IPeopleRepository from './IPeopleRepository';


export default class InMemoryPeopleRepository implements IPeopleRepository {
  static mock: Array<any> = [];
  create(person: People): Promise<any> {
    const foundId = InMemoryPeopleRepository.mock.some(register => register.id === person.getId);

    if (foundId) {
      throw new CreatePeopleException('Person already exists');
    }

    InMemoryPeopleRepository.mock.push(person);
    return Promise.resolve(person);
  }
  findAll(): Promise<any> {
    return Promise.resolve(InMemoryPeopleRepository.mock);
  }

  findById(id: string): Promise<People> {
    return Promise.resolve(InMemoryPeopleRepository.mock.find(element => element.id === id));
  }
}
