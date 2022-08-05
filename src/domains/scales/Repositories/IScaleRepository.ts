import ScaleTypeORM from '../Entity/Scale.typeorm';

export default interface IScaleRepository {
  create(scale: ScaleTypeORM): Promise<ScaleTypeORM>;
  findAll(): Promise<ScaleTypeORM[]>;
  findByDate(date: Date): Promise<ScaleTypeORM | null>;
}
