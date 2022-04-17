import CreatePeopleException from '../Exceptions/CreateUserException';
import { randomUUID } from 'crypto';
import Instrument from '../../instruments/Entity/Instrument';

export type Gender = 'M' | 'F'

export interface PeopleProps {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  gender: Gender;
  isMinister: boolean;
  instruments?: Instrument[];
}

export default class People {
  private id: string;
  private name: string;
  private email: string;
  private phone: string | undefined;
  private gender: Gender;
  private isMinister: boolean;
  private instruments: Instrument[];

  constructor(props: PeopleProps) {
    this.id = props.id || randomUUID();
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.instruments = props.instruments || [];
    this.gender = props.gender;
    this.isMinister = props.isMinister;

    this.validate();
  }

  private validate() {
    if (!this.id) throw new CreatePeopleException('Id is required');
    if (!this.name) throw new CreatePeopleException('Name is required');
    if (!this.email) throw new CreatePeopleException('Email is required');
    if (!this.gender) throw new CreatePeopleException('Gender is required');
    if (!this.isMinister) throw new CreatePeopleException('IsMinister is required')
  }

  get getId() {
    return this.id;
  }

  get getName() {
    return this.name;
  }

  get getEmail() {
    return this.email;
  }

  get getPhone() {
    return this.phone;
  }

  get getInstruments() {
    return this.instruments;
  }

  get getGender() {
    return this.gender;
  }

  get getIsMinister() {
    return this.isMinister;
  }

}
