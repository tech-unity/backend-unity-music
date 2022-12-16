import IMusicRepository from '../../musics/Repositories/IMusicRepository';
import { ScaleProps } from '../Entity/Scale.props';
import CreateScaleException from '../Exceptions/CreateScaleException';
import IScaleRepository from '../Repositories/IScaleRepository';

export default class CreateValidator {
  constructor(
    private scaleRepository: IScaleRepository,
    private musicRepository: IMusicRepository
  ) {}

  async execute(scale: ScaleProps) {
    if (!scale) throw new CreateScaleException('Invalid properties');

    if (!scale.date) throw new CreateScaleException('Date is required');
    if (!scale.band) throw new CreateScaleException('Band is required');
    if (!scale.singers) throw new CreateScaleException('Singers are required');
    if (!scale.musics) throw new CreateScaleException('Musics are required');

    const foundDate = await this.scaleRepository.findByDate(
      new Date(scale.date)
    );
    if (foundDate) {
      throw new CreateScaleException(
        `A scale to date [ ${new Date(
          scale.date
        ).toLocaleDateString()} ] already exists`
      );
    }

    if (!Array.isArray(scale.band)) {
      throw new CreateScaleException(
        `Band is required and it must be an array. [{instrument: string, person: string}]`
      );
    }

    if (!Array.isArray(scale.singers)) {
      throw new CreateScaleException(
        `Singers are required and it must be an string array.`
      );
    }

    if (!Array.isArray(scale.musics)) {
      throw new CreateScaleException(
        `Musics are required and it must be an string array.`
      );
    }
  }
}
