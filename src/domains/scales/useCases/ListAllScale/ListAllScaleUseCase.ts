import Scale from '../../Entity/Scale';
import IScaleRepository from '../../Repositories/IScaleRepository';

class ListAllScaleUseCase {
  constructor(private repository: IScaleRepository) {}
  execute(): Promise<Scale[]> {
    return Promise.resolve(this.repository.findAll());
  }
}

export default ListAllScaleUseCase;
