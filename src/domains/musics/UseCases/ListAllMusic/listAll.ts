import MusicTypeORM from '../../Entity/Music.typeorm';
import IMusicRepository from '../../Repositories/IMusicRepository';

class ListAllMusicUseCase {
  constructor(private repository: IMusicRepository) {}
  async execute(): Promise<MusicTypeORM[]> {
    return await this.repository.findAll();
  }
}

export default ListAllMusicUseCase;
