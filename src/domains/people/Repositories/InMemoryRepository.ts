import People, { PeopleProps } from '../Entity/People';
import IPeopleRepository from './IPeopleRepository';

let mock: Array<any> = [];

export default class InMemoryPeopleRepository implements IPeopleRepository {
  create(person: People): Promise<any> {
    const foundId = mock.some(register => register.id === person.getId);

    if (foundId) {
      throw new Error('Person already exists');
    }

    mock.push(person);
    return Promise.resolve(person);
  }
  findAll(): Promise<any> {
    return Promise.resolve(mock);
  }
}
