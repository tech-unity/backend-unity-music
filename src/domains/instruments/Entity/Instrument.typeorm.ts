import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export default class InstrumentTypeORM {
  @PrimaryColumn()
  id!: string;
  
  @Column()
  name!: string;
}
