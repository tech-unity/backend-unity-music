import CreateUserException from '../Exceptions/CreateUserException';
import { v4 } from 'uuid';

export interface PeopleProps {
  id: string;
  name: string;
  email: string;
}

export default class People {
  private name: string;
  private email: string;
  private id: string;

  private constructor(props: PeopleProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    Object.freeze(this);
  }

  static create(props: PeopleProps) {
    if (!props.name) throw new CreateUserException('Name is required');
    if (!props.email) throw new CreateUserException('Email is required');

    props.id = v4();

    return new People(props);
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
}
