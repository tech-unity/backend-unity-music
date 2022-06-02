import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'instruments' })
export default class InstrumentTypeORM {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;
}
