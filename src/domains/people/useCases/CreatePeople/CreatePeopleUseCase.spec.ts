import CreatePeopleUseCase from './CreatePeopleUseCase';
import InMemoryRepository from '../../Repositories/InMemoryRepository';
import { Gender } from '../../Entity/People';
describe('CreatePeopleUseCase', () => {
  it('should create a person', async () => {
    const createPeopleUseCase = new CreatePeopleUseCase(
      new InMemoryRepository()
    );

    const peopleProps = {
      name: 'Enzo',
      email: 'enzomoraes12@hotmail.com',
      phone: '67992753470',
      gender: 'M' as Gender,
      isMinister: false,
    };
    const result = await createPeopleUseCase.execute(peopleProps);

    expect(result.getId).toBeDefined();
    expect(result.getEmail).toBeDefined();
    expect(result.getName).toBeDefined();
    expect(result.getPhone).toBeDefined();
  });
});
