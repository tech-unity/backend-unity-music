import { MusicProps } from '../../Entity/Music.props';
import MusicTypeORM from '../../Entity/Music.typeorm';
import IMusicRepository from '../../Repositories/IMusicRepository';
import CreateValidator from '../../Validations/createValidator';

export default class CreateUseCase {
  constructor(
    private repository: IMusicRepository,
    private createValidator: CreateValidator
  ) {}

  async execute(props: MusicProps): Promise<MusicTypeORM> {
    await this.createValidator.execute(props);

    const music = new MusicTypeORM();
    music.name = props.name;
    music.src = props.src;
    return await this.repository.create(music);
  }
}
