import CreateInstrumentUseCase from './CreateInstrumentUseCase';
import InMemoryRepository from '../../Repositories/InMemoryRepository';
import CreateInstrumentException from '../../Exceptions/CreateInstrumentException';
describe('CreateInstrumentUseCase', () => {
  it('should create a instrument', async () => {
    const createInstrumentUseCase = new CreateInstrumentUseCase(
      new InMemoryRepository()
    );

    const instrumentProps = {
      name: 'Violão',
    };
    const result = await createInstrumentUseCase.execute(instrumentProps);

    expect(result.getId).toBeDefined();
    expect(result.getName).toBeDefined();
  });

  it('should not create a instrument when name is empty', async () => {
    const createInstrumentUseCase = new CreateInstrumentUseCase(
      new InMemoryRepository()
    );

    const instrumentProps = {
      name: '',
    };

    expect.assertions(1);
    createInstrumentUseCase
      .execute(instrumentProps)
      .catch(e => expect(e).toBeInstanceOf(CreateInstrumentException));
  });
});
