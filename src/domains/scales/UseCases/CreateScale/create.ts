import toPostgresDate from '../../../../utils/toPostgresDate';
import IInstrumentsRepository from '../../../instruments/Repositories/IInstrumentRepository';
import MusicTypeORM from '../../../musics/Entity/Music.typeorm';
import IMusicRepository from '../../../musics/Repositories/IMusicRepository';
import PeopleTypeORM from '../../../people/Entity/People.typeorm';
import IPeopleRepository from '../../../people/Repositories/IPeopleRepository';
import { ScaleProps } from '../../Entity/Scale.props';
import ScaleTypeORM, { BandTypeORM } from '../../Entity/Scale.typeorm';
import CreateScaleException from '../../Exceptions/CreateScaleException';
import IScaleRepository from '../../Repositories/IScaleRepository';
import CreateValidator from '../../Validations/createValidator';

export default class CreateUseCase {
  constructor(
    private scaleRepository: IScaleRepository,
    private peopleRepository: IPeopleRepository,
    private instrumentRepository: IInstrumentsRepository,
    private musicRepository: IMusicRepository,
    private createValidator: CreateValidator
  ) {}

  async execute(props: ScaleProps): Promise<ScaleTypeORM> {
    await this.createValidator.execute(props);

    const bandArray: BandTypeORM[] = [];
    const singersArray: PeopleTypeORM[] = [];
    const musicsArray: MusicTypeORM[] = [];

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
      const band = new BandTypeORM();
      band.instrument = instrument;
      band.person = person;

      bandArray.push(band);
    }

    for (let index = 0; index < props.singers.length; index++) {
      const person = await this.peopleRepository.findById(props.singers[index]);
      if (!person) {
        throw new CreateScaleException(
          `Person with id: ${props.singers[index]} does not exist`
        );
      }
      singersArray.push(person);
    }

    for (let index = 0; index < props.musics.length; index++) {
      const music = await this.musicRepository.findById(props.musics[index]);
      if (!music) {
        throw new CreateScaleException(
          `Music with id: ${props.musics[index]} does not exist`
        );
      }
      musicsArray.push(music);
    }

    const scale = new ScaleTypeORM();
    scale.singers = singersArray;
    scale.band = bandArray;
    scale.musics = musicsArray;
    scale.date = toPostgresDate(props.date);
    return await this.scaleRepository.create(scale);
  }
}
