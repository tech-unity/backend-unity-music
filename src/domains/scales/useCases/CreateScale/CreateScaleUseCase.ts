import IInstrumentsRepository from '../../../instruments/Repositories/IInstrumentRepository';
import People from '../../../people/Entity/People';
import IPeopleRepository from '../../../people/Repositories/IPeopleRepository';
import Scale, { Band, ScaleProps } from '../../Entity/Scale';
import CreateScaleException from '../../Exceptions/CreateScaleException';
import IScaleRepository from '../../Repositories/IScaleRepository';

export interface ScaleDTORequest {
  id?: string;
  date: Date;
  band: Array<{ instrument: string; person: string }>;
  singers: Array<string>;
}

export interface ScaleDTOResponse {
  id?: string;
  date: Date;
  band: Band;
  singers: Array<People>;
}

export default class CreateScaleUseCase {
  constructor(
    private scaleRepository: IScaleRepository,
    private peopleRepository: IPeopleRepository,
    private instrumentRepository: IInstrumentsRepository
  ) {}

  async execute(props: ScaleDTORequest): Promise<ScaleDTOResponse> {
    if (!props) throw new CreateScaleException('Invalid properties');
    if (!Array.isArray(props.band)) {
      throw new CreateScaleException(
        `Band is required and it must be an array. [{instrument: string, person: string}]`
      );
    }
    if (!Array.isArray(props.singers)) {
      throw new CreateScaleException(
        `Singers are required and it must be an array.`
      );
    }

    const band: Band = [];

    for (let index = 0; index < props.band.length; index++) {
      const instrument = await this.instrumentRepository.findById(
        props.band[index].instrument
      );
      if (!instrument) {
        throw new CreateScaleException(
          `Instrument with id: ${props.band[index].instrument} does not exist`
        );
      }
      const person = await this.peopleRepository.findById(
        props.band[index].person
      );
      if (!person) {
        throw new CreateScaleException(
          `Person with id: ${props.band[index].person} does not exist`
        );
      }
      band.push({instrument, person});
    }

    const singers: People[] = [];
    
    for (let index = 0; index < props.singers.length; index++) {
      const person = await this.peopleRepository.findById(props.singers[index]);
      if (!person) {
        throw new CreateScaleException(
          `Person with id: ${props.singers[index]} does not exist`
        );
      }
      singers.push(person);
    }

    const scaleProps: ScaleProps = {
      id: props.id!,
      date: props.date,
      band: band,
      singers: singers,
    };

    const scale = new Scale(scaleProps);
    await this.scaleRepository.create(scale);

    return {
      id: scale.getId,
      date: scale.getDate,
      band: scale.getBand,
      singers: scale.getSingers
    }
  }
}
