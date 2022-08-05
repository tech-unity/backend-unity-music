import ScaleTypeORM from '../Entity/Scale.typeorm';
import CreateScaleException from '../Exceptions/CreateScaleException';
import ScaleNotFoundException from '../Exceptions/ScaleNotFoundException';
import IScaleRepository from './IScaleRepository';

export default class InMemoryScaleRepository implements IScaleRepository {
  static mock: Array<ScaleTypeORM> = [];
  create(scale: ScaleTypeORM): Promise<ScaleTypeORM> {
    InMemoryScaleRepository.mock.push(scale);
    return Promise.resolve(scale);
  }
  findAll(): Promise<ScaleTypeORM[]> {
    return Promise.resolve(InMemoryScaleRepository.mock);
  }
  findByDate(date: Date): Promise<ScaleTypeORM> {
    const scale = InMemoryScaleRepository.mock.find(e => new Date(date).toLocaleDateString() === new Date(e.date).toLocaleDateString());
    if (!scale) {
      throw new ScaleNotFoundException(`Scale to date ${date.toLocaleDateString()} does not exist!`);
    }
    return Promise.resolve(scale);
  }
}
