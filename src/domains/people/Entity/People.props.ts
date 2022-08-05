import { InstrumentProps } from '../../instruments/Entity/Instrument.props';
import InstrumentTypeORM from '../../instruments/Entity/Instrument.typeorm';

export type Gender = 'M' | 'F'

export interface PeopleProps {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  gender: Gender;
  isMinister: boolean;
  instruments?: string[];
}
