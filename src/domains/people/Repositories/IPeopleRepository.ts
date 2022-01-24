import People from '../Entity/People';

export default interface IPeopleRepository {
  create(props: People): Promise<any>;
  findAll(): Promise<any>;
}
