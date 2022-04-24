import People, { PeopleProps } from '../Entity/People';

export default interface IPeopleRepository {
  create(props: People): Promise<any>;
  findAll(): Promise<any>;
  findById(id: string): Promise<People>;
}
