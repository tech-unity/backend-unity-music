import ScaleTypeORM from '../../Entity/Scale.typeorm';
import IScaleRepository from '../../Repositories/IScaleRepository';

export default class ListAllUseCase {
  constructor(private repository: IScaleRepository) {}
  async execute(): Promise<ScaleTypeORM[]> {
    return await this.repository.findAll();
  }
}
