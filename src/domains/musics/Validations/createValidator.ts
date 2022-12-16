import { MusicProps } from '../Entity/Music.props';
import CreateMusicException from '../Exceptions/CreateMusicException';

export default class CreateValidator {
  async execute(props: MusicProps) {
    if (!props) throw new CreateMusicException('Invalid properties');
    if (!props.name) throw new CreateMusicException('Name is required');
    if (props.name.trim().length === 0)
      throw new CreateMusicException('Name may not be empty');
    if (!props.src) throw new CreateMusicException('Src link is required');
  }
}
