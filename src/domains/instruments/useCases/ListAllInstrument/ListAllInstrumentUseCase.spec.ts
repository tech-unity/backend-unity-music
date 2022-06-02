import Instrument from '../../Entity/Instrument';
import InMemoryInstrumentRepository from '../../Repositories/InMemoryRepository';
import ListAllInstrument from './ListAllInstrumentUseCase';

describe('ListAllInstrument', () => {
  it('should list all instruments', async () => {
    const repository = new InMemoryInstrumentRepository();
    repository.create(
      new Instrument({
        name: 'violão',
      })
    );
    repository.create(
      new Instrument({
        name: 'teclado',
      })
    );
    const ListAllInstrumentUseCase = new ListAllInstrument(repository);

    const result = await ListAllInstrumentUseCase.execute();
    expect(result).toHaveLength(2);
  });
});
