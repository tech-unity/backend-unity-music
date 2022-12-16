import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'musics' })
export default class MusicTypeORM {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  src!: string;
}
