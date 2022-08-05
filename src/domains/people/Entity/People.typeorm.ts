import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import InstrumentTypeORM from '../../instruments/Entity/Instrument.typeorm';

@Entity({ name: 'people' })
export default class PeopleTypeORM {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column()
  gender!: string;

  @Column()
  isMinister!: boolean;

  @ManyToMany(() => InstrumentTypeORM)
  @JoinTable({ name: 'people_instruments' })
  instruments?: InstrumentTypeORM[];
}
