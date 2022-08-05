import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import InstrumentTypeORM from '../../instruments/Entity/Instrument.typeorm';
import PeopleTypeORM from '../../people/Entity/People.typeorm';

@Entity({ name: 'band' })
export class BandTypeORM {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToMany(() => InstrumentTypeORM)
  @JoinTable({ name: 'band_instrument' })
  instrument!: InstrumentTypeORM;

  @JoinTable({ name: 'band_person' })
  @ManyToMany(() => PeopleTypeORM)
  person!: PeopleTypeORM;
}

@Entity({ name: 'scale' })
export default class ScaleTypeORM {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({unique: true, type: 'date'})
  date!: string;

  @ManyToMany(() => BandTypeORM)
  @JoinTable({ name: 'scale_band' })
  band!: BandTypeORM[];

  @ManyToMany(() => PeopleTypeORM)
  @JoinTable({ name: 'scale_singers' })
  singers!: PeopleTypeORM[];
}
