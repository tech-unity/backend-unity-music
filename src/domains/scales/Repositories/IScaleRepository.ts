import Scale from "../Entity/Scale";

export default interface IScaleRepository {
  create(scale: Scale): Promise<Scale>;
  findAll(): Promise<Scale[]>;
}