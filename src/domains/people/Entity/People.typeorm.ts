import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import Instrument from '../../instruments/Entity/Instrument';
import InstrumentTypeORM from '../../instruments/Entity/Instrument.typeorm';

@Entity()
export default class PeopleTypeORM {
  @PrimaryColumn()
  id!: string;
  
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({nullable: true})
  phone?: string;

  @Column()
  gender!: string;

  @Column()
  isMinister!: boolean;

  @ManyToMany(() => InstrumentTypeORM)
  @JoinTable()
  instruments!: InstrumentTypeORM[];
}
