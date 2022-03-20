import CreateUserException from '../Exceptions/CreateUserException';
import { randomUUID } from 'crypto';

export interface PeopleProps {
  id?: string;
  name: string;
  email: string;
  phone?: string;
}

export default class People {
  private id: string;
  private name: string;
  private email: string;
  private phone: string | undefined;

  constructor(props: PeopleProps) {
    this.id = props.id || randomUUID();
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;

    this.validate();
  }

  private validate() {
    if (!this.id) throw new CreateUserException('Id is required');
    if (!this.name) throw new CreateUserException('Name is required');
    if (!this.email) throw new CreateUserException('Email is required');
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
}
