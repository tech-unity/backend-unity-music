import Scale from "../Entity/Scale";
import CreateScaleException from "../Exceptions/CreateScaleException";
import IScaleRepository from "./IScaleRepository";


export default class InMemoryScaleRepository implements IScaleRepository {
  static mock: Array<any> = [];
  create(scale: Scale): Promise<Scale> {
    const foundDate = InMemoryScaleRepository.mock.some(register => register.getDate === scale.getDate);

    if (foundDate) {
      throw new CreateScaleException('Scale already exists');
    }

    InMemoryScaleRepository.mock.push(scale);
    return Promise.resolve(scale);
  }
  findAll(): Promise<any> {
    return Promise.resolve(InMemoryScaleRepository.mock);
  }

}