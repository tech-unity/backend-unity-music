import { Repository } from 'typeorm';
import { AppDataSource } from '../../../infrastructure/AppDataSource';
import MusicTypeORM from '../Entity/Music.typeorm';
import MusicNotFoundException from '../Exceptions/MusicNotFoundException';
import IMusicRepository from './IMusicRepository';

export default class PostgresMusicRepository implements IMusicRepository {
  private repository: Repository<MusicTypeORM>;

  constructor() {
    this.repository = AppDataSource.getRepository(MusicTypeORM);
  }

  async create(music: MusicTypeORM): Promise<MusicTypeORM> {
    return await this.repository.save(music);
  }

  async findAll(): Promise<MusicTypeORM[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<MusicTypeORM> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new MusicNotFoundException(`Music of id ${id} does not exist!`);
    }
    return entity;
  }
}
