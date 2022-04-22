import Scale, { ScaleProps } from "../../Entity/Scale";
import CreateScaleException from "../../Exceptions/CreateScaleException";
import IScaleRepository from "../../Repositories/IScaleRepository";

export default class CreateScaleUseCase {

  constructor(private repository: IScaleRepository) { }
  
  async execute(props: ScaleProps): Promise<Scale> {

    if (!props) throw new CreateScaleException('Invalid properties');

    const scale = new Scale(props)
    await this.repository.create(scale)

    return scale;
  }
}