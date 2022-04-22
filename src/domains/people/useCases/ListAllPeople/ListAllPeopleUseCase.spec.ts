import People, { Gender } from '../../Entity/People';
import InMemoryPeopleRepository from '../../Repositories/InMemoryRepository';
import ListAllPeople from './ListAllPeopleUseCase';

describe('ListAllPeople', () => {
  it('should list all people', async () => {
    const repository = new InMemoryPeopleRepository();
    repository.create(
      new People({
        name: 'enzo',
        email: 'enzomoraes12@hotmail.com',
        phone: '67992753470',
        gender: 'M' as Gender,
        isMinister: false,
      })
    );
    repository.create(
      new People({
        name: 'enzo',
        email: 'enzomoraes12@hotmail.com',
        phone: '67992753470',
        gender: 'M' as Gender,
        isMinister: false,
      })
    );
    const ListAllPeopleUseCase = new ListAllPeople(repository);

    const result = await ListAllPeopleUseCase.execute();
    expect(result).toHaveLength(2);
  });
});
