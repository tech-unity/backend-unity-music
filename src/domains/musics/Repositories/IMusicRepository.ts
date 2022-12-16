import MusicTypeORM from '../Entity/Music.typeorm';

export default interface IMusicRepository {
  create(music: MusicTypeORM): Promise<MusicTypeORM>;
  findAll(): Promise<MusicTypeORM[]>;
  findById(id: string): Promise<MusicTypeORM>;
}
