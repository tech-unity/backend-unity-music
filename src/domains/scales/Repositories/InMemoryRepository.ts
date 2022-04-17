import Scale from "../Entity/Scale";
import CreateScaleException from "../Exceptions/CreateScaleException";
import IScaleRepository from "./IScaleRepository";

let mock: Array<any> = [];

export default class InMemoryRepository implements IScaleRepository {
  create(scale: Scale): Promise<any> {
    const foundDate = mock.some(register => register.getDate === scale.getDate);

    if (foundDate) {
      throw new CreateScaleException('Scale already exists');
    }

    mock.push(scale);
    return Promise.resolve(scale);
  }
  findAll(): Promise<any> {
    return Promise.resolve(mock);
  }

}